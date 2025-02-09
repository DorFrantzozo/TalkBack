Tic Tac Toe Online Web Game

Welcome to Tic Tac Toe Online, a web-based multiplayer game featuring individual player profiles and an integrated chat system. This project can be accessed both via the web and as a standalone desktop application using Electron.

Features

Multiplayer Gameplay: Play Tic Tac Toe in real-time with other players.

Player Profiles: Each player has an individual profile.

Live Chat: Communicate with other players during the game using the integrated chat system.

Cross-Platform Support: Available as a web application and as a desktop app powered by Electron.

Technologies Used

JavaScript (JS): Core programming language for the frontend and game logic.

Socket.IO: Real-time communication between the server and clients for multiplayer gameplay and chat.

Electron: Desktop application framework to build cross-platform desktop apps using web technologies.




Installation Instructions

Web Application

Clone the repository:

git clone https://github.com/DorFrantzozo/TalkBack.git
cd TalkBack

Install dependencies:

npm install

Start the server:

npm start

Access the game in your browser at:

http://localhost:3000

Desktop Application (Electron)

Follow the web application setup steps above.

Install Electron as a development dependency:

npm install electron --save-dev

Add the following script to your package.json:

"scripts": {
  "electron-start": "electron ."
}

Start the Electron app:

npm run electron-start

Usage

Open the application and sign in or create a new profile.

Join or create a game room to start playing Tic Tac Toe.

Use the chat feature to communicate with other players.

Enjoy the game!
