import "dotenv";
import path from "path";
import { getLanIp } from "./scripts/networkTools.js";


export default function loadDevEnv() {
  /* Configurações básicas */
  const PORT = process.env.EXPO_PORT || 8081;
  const LOCAL_IP = getLanIp(PORT, "192.168.0.123"); // Esse é o IP da minha máquina, coloque da sua própria.
  const APK_PATH = path.resolve("android/app/build/outputs/apk/debug/app-debug.apk");

  /* Opções de build */
  const GRADLE_BUILD_ARGS = "--no-daemon --no-parallel --max-workers=1";
  const GRADLE_JVM_ARGS = "-Xmx512m";
  
  const CODESPACE_DOMAIN = // Shorthand para essa variável de ambiente com nome gigantesco
    process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || "app.github.dev"; 

    process.env.PORT = PORT
    process.env.LOCAL_IP = LOCAL_IP;
    process.env.APK_PATH = APK_PATH
    process.env.GRADLE_BUILD_ARGS = GRADLE_BUILD_ARGS;
    process.env.GRADLE_JVM_ARGS = GRADLE_JVM_ARGS;
    process.env.CODESPACES === "true" && (process.env.CODESPACE_DOMAIN = CODESPACE_DOMAIN);
    process.env.METRO_FORCE_POLLING = 1 // Deixar ativado caso rodando em um container
    return {
      PORT, LOCAL_IP, APK_PATH, GRADLE_BUILD_ARGS, GRADLE_JVM_ARGS, CODESPACE_DOMAIN
    }
}
