# Aerocube-WebApp

## Getting Started

### Prerequisites
1. Install Node 6.x.x (Latest version) and add to path (you may need to reboot for it to take effect, also installing node added it to my path AT)
2. Install Jetbrains Webstorm

### Instructions
1. Open webstorm, click check out from Version Control
2. Login with your github credentials, select this repo
3. Open a terminal window in the project directory, run the node package manager install. This will use the package.json file in the root of the project directory to install dependencies

   ```
   $ npm install
   ```
4. See various md files in the docs folder for information about commands, generators, and other intracies of this codebase.
5. To run a development build with a hot-reloading server configuration, run 

   ```
   $ npm run start
   ```
6. Be aware that hot-reloading is not perfect, at times it will refuse to recognize changes to the codebase. If this happens, press ctrl-c in the console to cancel the instance and re-run the development server. Happy coding!
