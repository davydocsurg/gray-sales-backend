FROM node:18-slim as builder

COPY package*.json /usr/package*.json
COPY . .

# Create app directory

WORKDIR /usr/src/app
# Install app dependencies
RUN npm install --frozen-lockfile
# ARG NODE_ENV
# RUN if ["$NODE_ENV"="development"]; then npm install; else npm install --only=production; fi
# COPY . .

WORKDIR /usr/src/app
RUN npm run build

RUN npm install --frozen-lockfile --production --ignore-scripts


# Build app
FROM node:18-slim
COPY --from=builder /usr/src /usr/src

WORKDIR /usr/src/app

ENV NODE_ENV=production

EXPOSE 8080

CMD [ "node" , "./build/index.js"]




# Use an official Node.js runtime as a parent image
# FROM node:18-slim

# set user
# USER node

# Set the working directory to /app
# WORKDIR /Users/pc/graysales-backend
# WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
# COPY package*.json ./
# COPY --chown=node:node package*.json ./

# RUN npm install

# COPY . .
# COPY --chown=node:node . .

# Install dependencies
# RUN if ["$NODE_ENV"="development"]; then npm install; else npm install --only=production; fi

# Copy the rest of the application code to the container
# COPY . .

# Compile the TypeScript code to JavaScript
# RUN npm run build

# Expose the port that the application will listen on
# EXPOSE 8080

# Start the application
# CMD ["npm", "start"]
# CMD [ "node" , "./build/index.js"]





