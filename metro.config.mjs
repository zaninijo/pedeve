import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { getDefaultConfig } from "expo/metro-config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = getDefaultConfig(__dirname);

config.watchFolders = [
  path.resolve('/workspaces/pedeve'),
];

export default config;
