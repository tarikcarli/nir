FROM node:12-alpine AS builder
WORKDIR /opt/app
COPY ./client .
RUN npm install
RUN npm run build

FROM ubuntu:20.04
ENV TZ=Turkey
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get upgrade -y
RUN apt-get install tzdata
RUN apt-get install -y curl cmake python3 python3-pip
RUN pip install opencv-python dlib face_recognition
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install nano ffmpeg libsm6 libxext6  -y
WORKDIR /opt/app
COPY . .
COPY --from=builder /opt/app/build ./server/dist
RUN cd server && npm ci --only=production
CMD ["node", "-r","dotenv/config", "server/www"]
