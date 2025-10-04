# Usamos Node 20 Alpine, leve e atual
FROM node:20-alpine

ENV ANDROID_SDK_ROOT=/opt/android-sdk-linux
ENV PATH=$PATH:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Instalar dependências essenciais para Android SDK e builds React Native
RUN apk add --no-cache \
    bash \
    curl \
    git \
    git-lfs \
    openjdk17 \
    python3 \
    make \
    g++ \
    gcc \
    libc6-compat \
    unzip \
    jq

# Baixar e instalar Android SDK Command Line Tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    cd /tmp && \
    curl -o cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-9123335_latest.zip && \
    unzip cmdline-tools.zip && \
    mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools/latest && \
    mv cmdline-tools/* ${ANDROID_SDK_ROOT}/cmdline-tools/latest/ && \
    rm -rf cmdline-tools.zip cmdline-tools

# Atualizar SDK Manager e aceitar licenças
RUN yes | sdkmanager --licenses

# Instalar as plataformas e ferramentas Android necessárias
RUN sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0" "emulator"

# Instalar pacotes npm
WORKDIR /workspace
RUN npm init -y
RUN npm i
RUN npm i -g eas-cli

# Expor portas usadas pelo Expo
EXPOSE 19000 19001 19002 8081

# Definir CMD padrão para abrir shell
CMD ["bash"]
