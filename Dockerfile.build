FROM oven/bun:1.2.12

WORKDIR /app

COPY ./src ./src
COPY ./public ./public
COPY package.json .
COPY next.config.ts .
COPY tsconfig.json .
COPY postcss.config.mjs .

RUN bun install
RUN bun run build

CMD ["bun", "run", "start"]

EXPOSE 3000