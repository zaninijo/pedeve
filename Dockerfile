FROM node:20-bookworm-slim

# Variáveis Android
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator

# Dependências essenciais
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    curl \
    git \
    git-lfs \
    openjdk-17-jdk-headless \
    python3 \
    unzip \
    zip \
    build-essential \
    ninja-build \
    cmake \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Instalar Android SDK Commandline Tools
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools && \
    cd /tmp && \
    curl -o cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip && \
    unzip cmdline-tools.zip -d $ANDROID_SDK_ROOT/cmdline-tools && \
    mv $ANDROID_SDK_ROOT/cmdline-tools/cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest && \
    rm -rf cmdline-tools.zip

# Aceitar licenças
RUN yes | sdkmanager --licenses

# Instalar SDK + NDK + CMake necessários para React Native Vision Camera
RUN sdkmanager \
    "platform-tools" \
    "platforms;android-34" \
    "build-tools;34.0.0" \
    "cmake;3.22.1" \
    "ndk;23.1.7779620"

# Workspace do projeto
WORKDIR /workspace

# Copiar package.json e instalar deps
COPY package*.json ./
RUN npm install

# Copiar resto do projeto
COPY . .

# Expo envs
ENV EXPO_NO_DOCTOR=1
ENV CI=true

# Executa prebuild
RUN npx expo prebuild --non-interactive || true

# Shell padrão
CMD ["bash"]
