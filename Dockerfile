FROM node:18-slim as builder

COPY package*.json /graysales/
COPY . ./graysales

# Create app directory
WORKDIR /graysales

# Install app dependencies
RUN npm install --frozen-lockfile

# ARG NODE_ENV
# RUN if ["$NODE_ENV"="development"]; then npm install; else npm install --only=production; fi
# COPY . .

WORKDIR /graysales
RUN npm run build

RUN npm install --frozen-lockfile --production --ignore-scripts


# Build app
FROM node:18-slim
COPY --from=builder /usr/src /usr/src

WORKDIR /graysales

ENV NODE_ENV=production

EXPOSE 8080

CMD [ "node" , "./build/index.js"]