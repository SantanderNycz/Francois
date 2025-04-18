FROM debian:bullseye-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    clang \
    curl \
    git \
    libssl-dev \
    make \
    pkg-config \
    python3 \
    python3-pip \
    valgrind \
    wget \
    zsh \
    && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /francinette

# Clone the original francinette repository
RUN git clone https://github.com/xicodomingues/francinette.git .

# Install francinette
RUN ./bin/install.sh -y

# Create a wrapper script to run francinette
RUN echo '#!/bin/bash\n\
cd /project\n\
/francinette/bin/francinette "$@"' > /usr/local/bin/paco && \
    chmod +x /usr/local/bin/paco

# Set the working directory to /project
WORKDIR /project

# Set the entrypoint to the paco script
ENTRYPOINT ["/usr/local/bin/paco"]
