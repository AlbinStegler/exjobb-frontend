FROM node:20.9.0

WORKDIR /frontend

# Copy package.json and package-lock.json from egaming folder
COPY ./frontend/egaming/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ./frontend/ ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "run", "start"]
