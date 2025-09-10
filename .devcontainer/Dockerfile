FROM node:latest

RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    unzip \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g expo-cli

WORKDIR /workspace

RUN apt-get update && apt-get install -y watchman
