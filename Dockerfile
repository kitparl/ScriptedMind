FROM node:20-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build the project
RUN pnpm run build

EXPOSE 3003

CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3003"]