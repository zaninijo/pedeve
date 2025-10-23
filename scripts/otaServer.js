import http from "http";
import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import QRCode from "qrcode";

const PORT = process.env.EXPO_PORT || 8081;
const APK_PATH = path.resolve("android/app/build/outputs/apk/debug/app-debug.apk");
const BUNDLE_DIR = path.resolve("dist");
const OTA_ENDPOINT = "/ota";

// Detecta se o --build foi passado
const shouldBuild = process.argv.includes("--build");

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const info of iface) {
      if (info.family === "IPv4" && !info.internal) return info.address;
    }
  }
  return "127.0.0.1";
}

function buildApk() {
  console.log("Iniciando build do APK...");
  try {
    execSync("./gradlew assembleDebug", { cwd: "android", stdio: "inherit" });
  } catch (err) {
    console.error("Erro durante o build do APK:", err.message);
    process.exit(1);
  }
}

function exportBundle() {
  console.log("Exportando bundle do Expo...");
  try {
    execSync("npx expo export --experimental-bundle --output-dir dist", { stdio: "inherit" });
  } catch (err) {
    console.error("Erro ao exportar bundle:", err.message);
    process.exit(1);
  }
}

function startServer() {
  if (!fs.existsSync(APK_PATH)) {
    console.error("APK não encontrado:", APK_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(BUNDLE_DIR)) {
    console.error("Bundle dist/ não encontrado. Execute exportBundle().");
    process.exit(1);
  }

  const codespace = process.env.CODESPACE_NAME;
  const domain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

  const hostUrl = codespace && domain
    ? `https://${PORT}-${codespace}.${domain}`
    : `http://${getLocalIp()}:${PORT}`;

  const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/app.apk") {
      const stream = fs.createReadStream(APK_PATH);
      res.setHeader("Content-Type", "application/vnd.android.package-archive");
      res.setHeader("Content-Disposition", "attachment; filename=app-debug.apk");
      stream.pipe(res);
      return;
    }

    if (req.url === OTA_ENDPOINT) {
      const indexJsonPath = path.join(BUNDLE_DIR, "android-index.json");
      if (!fs.existsSync(indexJsonPath)) {
        res.writeHead(500);
        res.end("Bundle index JSON não encontrado");
        return;
      }
      const bundleJson = JSON.parse(fs.readFileSync(indexJsonPath, "utf-8"));
      bundleJson.launchAsset.url = `${hostUrl}/bundles/android-index.js`;
      bundleJson.assets = (bundleJson.assets || []).map(asset => ({
        ...asset,
        url: `${hostUrl}/bundles/${path.basename(asset.url)}`
      }));
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(bundleJson));
      return;
    }

    if (req.url.startsWith("/bundles/")) {
      const filePath = path.join(BUNDLE_DIR, req.url.replace("/bundles/", "bundles/"));
      if (fs.existsSync(filePath)) {
        res.writeHead(200);
        res.end(fs.readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  });

  server.listen(PORT, async () => {
    console.log(`Servidor iniciado em: ${hostUrl}`);
    try {
      const qr = await QRCode.toString(`${hostUrl}/app.apk`, { type: "terminal" });
      console.log("\nQR Code para download do APK:\n");
      console.log(qr);
    } catch (err) {
      console.error("Erro ao gerar QR Code:", err.message);
    }
  });
}

// Build opcional
if (shouldBuild) {
  buildApk();
  exportBundle();
} else {
  console.log("Ignorando build do APK e bundle. Apenas iniciando servidor...");
}

startServer();
