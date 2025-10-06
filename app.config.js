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

export const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const DOMAIN = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';
export const PORT = process.env.EXPO_PORT || 8081;
export const APK_PATH = path.resolve("android/app/build/outputs/apk/debug/app-debug.apk");
export const BUNDLE_DIR = path.resolve("dist");
export const OTA_ENDPOINT = "/ota";

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
                        "cameraPermissionText": "O Pentdrive precisa ter acesso à câmera para escanear produtos.",
                        "enableCodeScanner": true
                    }
                ]
            ],
            "android": {
                "permissions": [
                    "android.permission.CAMERA",
                    "android.permission.NFC"
                ],
                "package": "com.pentdriveapp"
            }
        }
    }
}
