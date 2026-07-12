#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/opt/projects/ScriptedMind"
COMPOSE_DIR="/opt/docker/project-run"
SERVICE_NAME="scriptedmind"
HEALTH_URL="http://127.0.0.1:4321"

echo "==> Pulling latest code..."
cd "$PROJECT_DIR"
git pull --ff-only

echo "==> Rebuilding and restarting container..."
cd "$COMPOSE_DIR"
docker compose build "$SERVICE_NAME"
docker compose up -d "$SERVICE_NAME"

echo "==> Waiting for service..."
sleep 3

if curl -fsI "$HEALTH_URL" >/dev/null; then
	echo "==> Deploy successful: $HEALTH_URL"
else
	echo "==> Deploy finished, but health check failed: $HEALTH_URL" >&2
	docker compose logs "$SERVICE_NAME" --tail 30
	exit 1
fi
