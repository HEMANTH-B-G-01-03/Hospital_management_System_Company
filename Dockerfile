# FROM nginx:alpine

# COPY . /usr/share/nginx/html

# EXPOSE 80

# Stage 1: Build React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy React source code
COPY frontend/ .

# Build React application
RUN npm run build


# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy React production build
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]