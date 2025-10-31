# sandbox-docker

> **Requirements:**
>
> - [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
> - Node.js

## Usage:

```bash
npx sandbox [main-path] [extra-mount...] [--env KEY=VALUE] [-e KEY=VALUE]
npx sandbox -h
```

## Commands

### `sandbox` — Universal Node.js Sandbox

```bash
npx sandbox [main-path] [extra-mount...]
```

#### Examples

```bash
# Run current directory
npx sandbox .

# Mount project + data + env
npx sandbox ./app /data ./backup -e NODE_ENV=production

# Show help
npx sandbox -h
```

> Interactive shell with `node`, `npm`

---

### `sandbox-claude` — AI-Powered Code Assistant

```bash
npx sandbox-claude [main-path] [extra-mount...]
```

#### Examples

```bash
# Launch claude-code in your project
npx sandbox-claude ./frontend

# With config and logs
npx sandbox-claude ./service /config ~/.claude /logs ./logs
```

> Automatically runs `@anthropic-ai/claude-code` in full isolation
---

## How It Works

### First Run (Both Commands)

- Builds cached Docker image from `node:20-alpine`
- `sandbox-claude` installs `claude-code` globally (npx sandbox-claude)
- Future runs are **instant**

## Local Development

```bash
git clone https://github.com/z1chir/sandbox-docker
cd sandbox-docker
npm link

# Use globally
sandbox ./test
sandbox-claude ./ai-app
```

## License

[MIT](LICENSE) © sandbox-docker

---

**Run any code. Run AI code. Stay safe.**
