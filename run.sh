#!/bin/bash

echo "Starting CampusConfess..."

# Stop old containers
docker compose down

# Build and start containers
docker compose up -d --build

# Wait a few seconds
sleep 10

echo ""
echo "Containers running:"
docker ps

echo ""
echo "Open these in browser:"
echo "Submit page: http://localhost:3000/Page1.html"
echo "View confessions: http://localhost:3000/Page2.html"
echo "CDN: http://localhost:8081"
