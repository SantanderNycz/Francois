# François (Francinette for Windows)

A native Windows version of the Francinette tester for 42 projects, without requiring Ubuntu or WSL.

## Prerequisites

- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- [Git for Windows](https://git-scm.com/download/win)

## Installation

1. Clone this repository:
   \`\`\`
   git clone https://github.com/your-username/francinette-windows.git
   \`\`\`

2. Navigate to the repository directory:
   \`\`\`
   cd francinette-windows
   \`\`\`

3. Run the installation script:
   \`\`\`
   .\install.bat
   \`\`\`

## Usage

Once installed, you can use the `paco` command from any directory containing your 42 project:

\`\`\`
cd path\to\your\project
paco
\`\`\`

### Common Commands

- `paco`: Run all tests for the current project
- `paco -h`: Show help
- `paco -u`: Update Francinette
- `paco -c`: Clean temporary files

## Supported Projects

- libft
- get_next_line
- ft_printf
- Born2beroot
- minitalk
- push_swap
- pipex
- philosophers
- And more!

## How It Works

This Windows version of Francinette uses Docker to create a Linux container that runs the original Francinette tester. The `paco` command automatically mounts your current directory into the container, allowing the tests to run on your code without requiring WSL or Ubuntu.

## Troubleshooting

### Docker not running
Make sure Docker Desktop is running before using Francinette.

### Path issues
If the `paco` command is not recognized, make sure the installation directory is in your PATH environment variable.

### File permission errors
If you encounter permission errors, try running the command prompt or PowerShell as Administrator.

## Uninstallation

To uninstall Francinette for Windows, run:

\`\`\`
.\uninstall.bat
\`\`\`

## Credits

This project is based on the original [Francinette](https://github.com/xicodomingues/francinette) by xicodomingues and the [francinette-image](https://github.com/WaRtr0/francinette-image) by WaRtr0.
