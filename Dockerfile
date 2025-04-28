#base image
FROM node:20.12-alpine as builder

#working dir
WORKDIR /app

#copy package json + lock json
COPY package*.json ./

#install Dependencies
RUN npm ci

# Copy source files
COPY . ./

# Build the app
RUN npm run build

# Default nginx configuration
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

