# DoGossip Real-Time chat

## 💡 Idea
- The Real-Time chat Web Application is a simple platform that allows users from around the world to join a single chat room and engage in real-time conversations.

## ✨ Features
- The unique twist to this chat application is that once a user enters the chat room, they are unable to view existing messages. Additionally, upon leaving the chat room, all previous messages are lost. 
- This project was developed as a means to explore the implementation of Socket.io for real-time communication and Shadcn/UI library for the frontend.

## 🛠 Tech Stack
1. 💻 Frontend:
React + Vite,
Shadcn/UI
2. 🗃 Backend:
Node.js,
Express.js
3. 📂 Database: Message transfer is facilitated through socket connections, eliminating the need for a database.
   - To display active user connections, local storage is utilized. When a new user arrives or leaves the chat room, the application leverages socket connections to inform all remaining users about the event. This ensures that everyone in the chat room is promptly notified when a new user joins or when someone departs.
   - This approach enhances the user experience by dynamically updating the active user list, enabling smooth and instantaneous communication within the chat room.
5. 👩🏼‍🤝‍🧑🏽 Real-Time Communication:
Socket.io

## 🤝 Contributing
If you'd like to contribute to this project, feel free to open an issue or submit a pull request. Your contributions are highly appreciated!
