#!/bin/bash

# Test Nginx configuration syntax using Docker
# This script runs Nginx in a container to validate our config

echo "🔍 Testing Nginx configuration syntax..."

# Run Nginx container with our config file
# -t flag tests configuration and exits
docker run --rm \
  -v "$(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro" \
  nginx:alpine \
  nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid!"
else
    echo "❌ Nginx configuration has errors"
    exit 1
fi
