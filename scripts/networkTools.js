import "dotenv";

export function getLanIp(port, ipAddress) {
  ipAddress = ipAddress || process.env.HOST_IP || "127.0.0.1";
  return process.env.CODESPACE === "true"
    ? `https://${port}-${codespaceName}.${codespaceDomain}`
    : `http://${ipAddress}${port ? `:${port}` : ""}`;
}

export function getInternalIp() {
  try {
    return execSync("ip -4 route show default | awk '{print $3}'")
      .toString()
      .trim();
  } catch {
    return `127.0.0.1`;
  }
}