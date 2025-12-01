import "dotenv";

// Carregar env
import loadDevEnv from "./server.env.js";
loadDevEnv();

export const API_ADDRESS = "localhost:8080";
export const FAKE_API = true; // Simula a API dentro do aplicativo
export const INACTIVITY_WARNING = 3 * 60 * 1000;
export const INACTIVITY_TRIGGER = 5 * 60 * 1000;

export default ({ config }) => ({
  ...config,
  name: "pedeve",
  slug: "pedeve-app",
  version: "1.0.0",

  platforms: [
    "android",
    "web"
  ],

  plugins: [
    "expo-font",
    "expo-secure-store",
    [
      "react-native-vision-camera",
      {
        cameraPermissionText:
          "O Pentdraive precisa ter acesso à câmera para escanear produtos.",
        enableCodeScanner: true,
      },
    ],
    "react-native-nfc-manager",
  ],

  android: {
    permissions: ["android.permission.CAMERA", "android.permission.NFC"],
    package: "com.pentdraive.app",
    manifest: {
      usesFeature: [ 
        {
          name: "android.hardware.camera",
          required: false
        },
        {
          name: "android.hardware.camera.autoFocus",
          required: false
        }
      ]
    }
  },

  extra: {
    API_ADDRESS,
    FAKE_API,
    INACTIVITY_TRIGGER,
    INACTIVITY_WARNING,
  },
});
