#!/usr/bin/env node

const { DOCKERFILE } = require("../lib/dockerfile");
const { main, defaultDir } = require("./main");

if (process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log(`
Docker Sandbox for Node.js

Usage:
  npx sandbox [main-path] [extra-mount...] [--env KEY=VALUE] [-e KEY=VALUE]
  npx sandbox -h

Arguments:
  main-path      → /workspace (default: ${defaultDir()})
  /container/path /host/path → extra volume mount
  --env KEY=VAL  → pass environment variable
  -e KEY=VAL     → shorthand

Examples:
  npx sandbox ./my-app
  npx sandbox ./app /data ./backup -e NODE_ENV=production
  `);
  process.exit(0);
}

main(DOCKERFILE, "sandbox-local");
