#!/bin/bash

echo "Starting CampusConfess System"

echo "Cleaning old containers and volumes"
docker compose down

echo "Building and starting containers"
docker compose up -d --build

echo "Waiting for containers to start"
sleep 20

echo "Checking running containers"
docker ps

echo "CampusConfess should now be running:"
echo "Frontend: http://localhost:3000/Page1.html"
echo "View page: http://localhost:3000/Page2.html"
echo "CDN: http://localhost:8081"
echo "Backend API: http://localhost:3000/confessions"
