# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client for the correct binary target
RUN npx prisma generate

# Build the TypeScript application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/index.js"]