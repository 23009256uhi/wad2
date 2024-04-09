# Use Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire React app to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which the React app will run
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]