FROM node:21-alpine3.18

# Specify a working directory inside the container where your application code will be copied.
WORKDIR /app

# Copy 'package.json' and 'package-lock.json' into the container.
COPY package*.json ./

# Run 'npm install' to install dependencies
RUN npm install

# Copy the rest of your application code into the container.
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD [ "node", "server.js" ]
