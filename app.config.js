import 'dotenv/config';
import os from "os";
import path from 'path';

export function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const info of iface) {
      if (info.family === "IPv4" && !info.internal) return info.address;
    }
  }
  return "127.0.0.1";
}


/* Configurações do aplicativo */
export const API_ADDRESS = "localhost:8080";
// Quanto tempo demora para aparecer o aviso de inatividade
export const INACTIVITY_WARNING = 3 * 60 * 1000; // 3 min
// Quanto tempo em inatividade para resetar o aplicativo
export const INACTIVITY_TRIGGER = 5* 60 * 1000; // 5 min



/* Configurações para desenvolvimento */
/*
    ATENÇÃO: ao realizar mudanças nas configurações abaixo, é necessário re-executar o script
    de prebuild do Expo para aplicar as alterações.
    `npx expo prebuild`
*/
export const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const DOMAIN = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';

const PORT = process.env.EXPO_PORT || 8081;
const APK_PATH = path.resolve("android/app/build/outputs/apk/debug/app-debug.apk");
const BUNDLE_DIR = path.resolve("dist");
const OTA_ENDPOINT = "/ota";
export const OTA_CONFIG = { PORT, APK_PATH, BUNDLE_DIR, OTA_ENDPOINT }

export const OTA_URL = CODESPACE_NAME && DOMAIN
    ? `https://${PORT}-${CODESPACE_NAME}.${DOMAIN}`
    : `http://${getLocalIp()}:${PORT}`;

export default ({ config }) => {
    return {
        ...config,
        "expo": {
            "name": "pedeve",
            "slug": "pedeve-app",
            "version": "1.0.0",
            "platforms": [
                "android",
                "web"
            ],
            "updates": {
                "enabled": true,
                "url": `${OTA_URL}${OTA_ENDPOINT}`,
                "fallbackToCacheTimeout": 0,
            },
            "orientation": "portrait",
            "backgroundColor": "#ffffff",
            "plugins": [
                [
                    "react-native-vision-camera",
                    {
                        "cameraPermissionText": "O Pentdraive precisa ter acesso à câmera para escanear produtos.",
                        "enableCodeScanner": true
                    }
                ],
                [
                    "expo-font"
                ],
                [
                    "react-native-nfc-manager"
                ],
                [
                    "expo-secure-store"
                ]
            ],
            "android": {
                "permissions": [
                    "android.permission.CAMERA",
                    "android.permission.NFC"
                ],
                "package": "com.pentdraive.app"
            }
        }
    }
}