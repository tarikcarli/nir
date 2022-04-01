FROM node:12-alpine AS builder
WORKDIR /opt/app
COPY ./client .
RUN npm install
RUN npm run build

FROM node:12-alpine
WORKDIR /opt/app
COPY ./server .
COPY --from=builder /opt/app/build ./dist
RUN npm ci --only=production
CMD ["node", "-r","dotenv/config", "www"]
