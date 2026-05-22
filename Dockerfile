FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    git \
    curl \
    lsb-release \
    sudo \
    build-essential \
    clang \
    make \
    valgrind \
    zsh \
    wget \
    pkg-config \
    libssl-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /francinette

RUN git clone https://github.com/xicodomingues/francinette.git .

RUN ./bin/install.sh -y

RUN echo '#!/bin/bash' > /usr/local/bin/paco \
 && echo 'cd /project' >> /usr/local/bin/paco \
 && echo 'exec /francinette/bin/francinette "$@"' >> /usr/local/bin/paco \
 && chmod +x /usr/local/bin/paco

WORKDIR /project

ENTRYPOINT ["/usr/local/bin/paco"]
