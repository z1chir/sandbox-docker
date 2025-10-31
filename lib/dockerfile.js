module.exports.DOCKERFILE = `
FROM node:20-alpine
WORKDIR /workspace
CMD ["sh"]
`.trim();

module.exports.CLAUDE_DOCKERFILE = `
FROM node:20-alpine
RUN npm install -g @anthropic-ai/claude-code
WORKDIR /workspace
CMD ["sh"]
`.trim();
