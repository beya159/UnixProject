#!/bin/bash

if docker compose version >/dev/null 2>&1; then
    DOCKER_CMD="docker compose"
elif docker-compose version >/dev/null 2>&1; then
    DOCKER_CMD="docker-compose"
else
    echo " Error: Docker Compose is not installed"
    exit 1
fi

echo "Starting CampusConfess System using: $DOCKER_CMD"

# Cleaning old containers (Keeping volumes safe)
$DOCKER_CMD down

echo "Building and starting containers"
$DOCKER_CMD up -d --build

echo "Waiting for the database to initialise"

MAX_RETRIES=10
COUNT=0

while ! curl -s http://127.0.0.1:3000/confessions | grep -q "\[" && [ $COUNT -lt $MAX_RETRIES ]
do
    echo "Database is still initializing... (Attempt $((COUNT+1))/$MAX_RETRIES)"
    sleep 5
    ((COUNT++))
done

if [ $COUNT -eq $MAX_RETRIES ]; then
    echo "System taking too long"
else
    echo "System works"
    echo "Frontend: http://localhost:8081"
    echo "Backend: http://localhost:3000/confessions"
fi
