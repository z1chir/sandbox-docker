# sandbox-docker

> **Requirements:**
>
> - [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
> - Node.js

## Usage:

```bash
npm i -g sandbox-docker
sandbox [main-path] [extra-mount...] [--env KEY=VALUE] [-e KEY=VALUE]
sandbox -h
```

## Commands

### `sandbox` — Universal Node.js Sandbox

```bash
sandbox [main-path] [extra-mount...]
```

#### Examples

```bash
# Run current directory
sandbox .

# Mount project + data + env
sandbox ./app /data ./backup -e NODE_ENV=production

# Show help
sandbox -h
```

> Interactive shell with `node`, `npm`

---

### `sandbox-claude` — AI-Powered Code Assistant

```bash
sandbox-claude [main-path] [extra-mount...]
```

#### Examples

```bash
# Launch claude-code in your project
sandbox-claude ./frontend

# With config and logs
sandbox-claude ./service /config ~/.claude /logs ./logs
```

> Automatically runs `@anthropic-ai/claude-code` in full isolation
---

## How It Works

### First Run (Both Commands)

- Builds cached Docker image from `node:20-alpine`
- `sandbox-claude` installs `claude-code` globally
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
