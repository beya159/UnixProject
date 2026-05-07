#!/bin/bash

echo "Starting CampusConfess System"

echo "Cleaning old containers and volumes"
docker compose down

echo "Building and starting containers"
docker compose up -d --build

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
    echo "System taking too long (check 'docker logs cc-app' for errors)"
else
    echo "System works"
    echo "Frontend: http://localhost:8081"
    echo "Backend: http://localhost:3000/confessions"
fi
