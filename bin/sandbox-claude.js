#!/usr/bin/env node

const { CLAUDE_DOCKERFILE } = require("../lib/dockerfile");
const { main, defaultDir } = require("./main");

if (process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log(`
Docker Sandbox Claude Cli for Node.js

Usage:
  npx sandbox-claude [main-path] [extra-mount...] [--env KEY=VALUE] [-e KEY=VALUE]
  npx sandbox-claude -h

Arguments:
  main-path      → /workspace (default: ${defaultDir()})
  /container/path /host/path → extra volume mount
  --env KEY=VAL  → pass environment variable
  -e KEY=VAL     → shorthand

Examples:
  npx sandbox-claude ./my-app
  npx sandbox-claude ./app /data ./backup -e NODE_ENV=production
  `);
  process.exit(0);
}

main(CLAUDE_DOCKERFILE, "sandbox-claude-local", [
  "-c",
  `claude . || echo "claude failed or not installed. Starting shell..."; exec sh`,
]);
