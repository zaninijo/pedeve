// Esse script é executado após o ínicio do Codespace para deixar públicas as portas de desenvolvimento.
// publicPorts em devcontainer são as portas que serão abertas.
// Somente portas abertas (forwardPort) podem ser publicadas.

import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec as execCb } from "child_process";

const exec = promisify(execCb);
const codespace = process.env.CODESPACE_NAME;

if (!codespace) {
  console.log("A variável de ambiente CODESPACE_NAME não está definida. Pulando a publicação de portas...");
  process.exit(0);
}

async function makePortsPublic() {
  try {
    const devcontainerPath = path.resolve(".devcontainer/devcontainer.json");
    const devcontainer = JSON.parse(fs.readFileSync(devcontainerPath, "utf-8"));
    const forwardPorts = devcontainer.publicPorts || [];

    if (!forwardPorts.length) {
      console.log("Nenhuma porta definida em forwardPorts. Nada para publicar.");
      return;
    }

    console.log(`Tornando públicas as portas: ${forwardPorts.join(", ")}...`);

    await exec("gh auth status");

    for (const port of forwardPorts) {
      console.log(`Publicando porta ${port}...`);
      await exec(`gh codespace ports visibility ${port}:public -c ${codespace}`);
    }

    console.log("Todas as portas foram tornadas públicas!");
  } catch (error) {
    console.error("Erro ao tornar as portas públicas:", error.message);
  }
}

makePortsPublic();
