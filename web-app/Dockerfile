# Use the official Node.js image
FROM node:18

# Create a folder inside the container for our code
WORKDIR /usr/src/app

# Copy your package.json to install the libraries
COPY package*.json ./

# Install the libraries (express, mysql, etc.)
RUN npm install

# Copy the rest of your files (server.js, Page1.html, etc.)
COPY . .

# Open port 3000 for the web app
EXPOSE 3000

# Start the app
CMD [ "node", "server.js" ]
