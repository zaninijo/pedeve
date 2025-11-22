import http from "http";
import fs from "fs";
import "dotenv";
import { execSync } from "child_process";
import QRCode from "qrcode";
import loadDevEnv from "../server.env.js";

const { GRADLE_BUILD_ARGS, GRADLE_JVM_ARGS  } = loadDevEnv();
const { APK_PATH, PORT, LOCAL_IP } = process.env;

const verbose = process.argv.includes("--verbose");

function closeWrapper(cb) {
  console.log(
    `Pressione ENTER para iniciar o Metro (Expo). Certifique-se que um dispositivo está conectado via ADB e que a porta ${PORT} esteja disponível no ambiente e reversed (comando: adb reverse tcp:${PORT} tcp:${PORT}) no ADB.`
  );
  process.stdin.once("data", () => {
    cb();
    try {
      process.env.CI = false;
      execSync("npx expo start -a", { stdio: "inherit" });
    } catch (error) {
      verbose && console.log("Erro ao executar o Metro: ", error);
    }
  });
}


function buildApk() {
  console.log("Iniciando build do APK...");
  try {
    process.env.ORG_GRADLE_PROJECT_org_gradle_jvmargs = GRADLE_JVM_ARGS;

    execSync(`../android/gradlew assembleDebug ${GRADLE_BUILD_ARGS}`, {
      cwd: "android",
      stdio: "inherit",
    });

    console.log("Build concluído.");
  } catch (err) {
    console.error("Erro durante o build do APK:", err.message);
    process.exit(1);
  }
}

function startServer() {
  if (!fs.existsSync(APK_PATH)) {
    console.error("APK não encontrado:", APK_PATH);
    process.exit(1);
  }

  const server = http.createServer((req, res) => {
    const url = decodeURI(req.url || "/");
    verbose && console.log("REQ", url);

    if (url === "/app.apk") {
      const stream = fs.createReadStream(APK_PATH);
      res.setHeader("Content-Type", "application/vnd.android.package-archive");
      res.setHeader("Content-Disposition", "attachment; filename=app-debug.apk");
      stream.pipe(res);
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  });

  server.listen(PORT, "0.0.0.0", async () => {
    const downloadURL = `${LOCAL_IP}/app.apk`;

    console.log(`Servidor iniciado. Baixe o APK em: ${downloadURL}\n`);
    try {
      const qr = await QRCode.toString(downloadURL, { type: "terminal" });
      console.log(qr);
    } catch (e) {
      console.log("Erro ao gerar QR:", e.message);
    }
    closeWrapper(() => server.close());
  });
}

if (process.argv.includes("--build")) {
  buildApk();
}

startServer();



