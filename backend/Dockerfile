# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install bash (required by some tools in the Node.js ecosystem)
RUN apk add --no-cache bash

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the wait-for-it.sh script and make it executable in one step
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Copy the rest of the application code
COPY . .

# Generate Prisma client for the correct binary target
RUN npx prisma generate

# Build the TypeScript application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application (will be overridden by docker-compose)
CMD ["node", "dist/index.js"]