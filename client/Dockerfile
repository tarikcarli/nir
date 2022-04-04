FROM node:12-alpine AS builder
WORKDIR /opt/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21.6
COPY --from=builder /opt/app/build /data
COPY nir.conf /etc/nginx/conf.d/nir.conf