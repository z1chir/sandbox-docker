#!/usr/bin/env node
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

function defaultDir() {
  return path.join(os.homedir(), "Sandbox");
}

module.exports.defaultDir = defaultDir;

module.exports.main = (docker_file, image_name, init_command = []) => {
  const IMAGE = image_name;
  let mainDir = defaultDir();

  const args = process.argv.slice(2);
  const extraMounts = [];
  const envVars = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // --env or -e
    if (arg === "--env" || arg === "-e") {
      i++;
      if (i >= args.length) {
        console.error(`[ERROR] Missing value after ${arg}`);
        process.exit(1);
      }
      const env = args[i];
      if (!env.includes("=")) {
        console.error(`[ERROR] Env must be KEY=VALUE: ${env}`);
        process.exit(1);
      }
      envVars.push("--env", env);
      continue;
    }

    if (arg.startsWith("--env=")) {
      const env = arg.slice(6);
      if (!env.includes("=")) {
        console.error(`[ERROR] Invalid --env format: ${arg}`);
        process.exit(1);
      }
      envVars.push("--env", env);
      continue;
    }

    // Extra mount: /container /host
    if (arg.startsWith("/")) {
      const cPath = arg;
      i++;
      if (i >= args.length) {
        console.error(`[ERROR] Missing host path for: ${cPath}`);
        process.exit(1);
      }
      const hPath = path.resolve(args[i]);
      if (!fs.existsSync(hPath)) {
        console.error(`[ERROR] Path not found: ${hPath}`);
        process.exit(1);
      }
      extraMounts.push(`-v "${hPath}:${cPath}"`);
      continue;
    }

    // Main directory
    mainDir = path.resolve(arg);
  }

  // Create main dir if needed
  if (!fs.existsSync(mainDir)) {
    fs.mkdirSync(mainDir, { recursive: true });
    console.log(`Created: ${mainDir}`);
  }

  // Docker check
  try {
    require("child_process").execSync(
      "docker info >" +
        (os.platform() === "win32" ? "NUL" : "/dev/null") +
        " 2>&1"
    );
  } catch {
    console.error("[ERROR] Docker is not running.");
    process.exit(1);
  }

  // Build image if missing
  const hasImage = require("child_process")
    .execSync('docker images --format "{{.Repository}}"')
    .toString()
    .includes(IMAGE);

  if (!hasImage) {
    console.log("Building sandbox image...");
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sandbox-"));
    fs.writeFileSync(path.join(tmp, "Dockerfile"), docker_file);
    try {
      require("child_process").execSync(
        `docker build -t ${IMAGE} -f "${path.join(
          tmp,
          "Dockerfile"
        )}" "${tmp}"`,
        { stdio: "ignore" }
      );
      console.log("Image ready.");
    } catch {
      console.error("[ERROR] Build failed.");
      process.exit(1);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }

  const flatMounts = extraMounts.flatMap((m) => ["-v", m.slice(4, -1)]);

  const container_name = `sandbox-${Date.now()}`;

  const command = [
    "run",
    "-it",
    "--rm",
    "-v",
    `${mainDir}:/workspace`,
    ...flatMounts,
    ...envVars,
    "--workdir",
    "/workspace",
    "--name",
    `${container_name}`,
    IMAGE,
    "sh",
  ].concat(init_command);
  const docker = spawn("docker", command, {
    stdio: "inherit",
    shell: os.platform() === "win32",
  });

  docker.on("close", (code) => {
    process.exit(code);
  });
};
