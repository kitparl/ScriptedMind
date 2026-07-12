FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 4321

CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "4321"]
