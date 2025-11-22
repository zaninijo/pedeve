import { fileURLToPath } from "url";
import { dirname } from "path";
import { getDefaultConfig } from "expo/metro-config.js";

// Recria __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = getDefaultConfig(__dirname);

config.resetCache = true;

config.watcher = {
  useFsEvents: false,
  usePolling: true,
  interval: 100,
};

export default config;
