#!/usr/bin/env bash
set -euo pipefail

IMAGE="ghcr.io/dowilcox/packistry"
TAG="${1:-latest}"
PLATFORM="${2:-linux/arm64,linux/amd64}"

echo "Building $IMAGE:$TAG for $PLATFORM"

docker buildx build \
  --platform "$PLATFORM" \
  --tag "$IMAGE:$TAG" \
  --tag "$IMAGE:$(git rev-parse --short HEAD)" \
  --push \
  .
