# DoGossip Real-Time chat

## 💡 Idea
- The **Real-Time chat Web Application** is a simple platform that allows users from around the world to join a single chat room and engage in real-time conversations.
- The unique twist to this chat application is that **once a user enters the chat room, they are unable to view existing messages**. Additionally, **upon leaving the chat room, all previous messages are lost**. 
- This project was developed as a means to explore the implementation of Socket.io for real-time communication and Shadcn/UI library for the frontend.

## 🎨 Chat-Interface
<p align="center"><img width="400" src="https://github.com/Nayak-Sahil/doGossip/blob/main/frontend/public/Chat%20Interface.png" style="border-radius: 30px;"></p>

## 🛠 Tech Stack
### 💻 Frontend:
- **React + Vite**: For building the dynamic user interface.
- **Shadcn/UI**: A library for enhancing the visual appeal and user experience.

### 🗃 Backend:
- **Node.js**: For server-side JavaScript execution.
- **Express.js**: For building the RESTful API endpoints and handling HTTP requests.

### 👩🏼‍🤝‍🧑🏽 Real-Time Communication:
- **Socket.io**: Facilitating real-time bidirectional communication between the server and clients.

### 🗃 Database:
- **Message Transfer**: Facilitated through socket connections, eliminating the need for a traditional database.
- **Active User Connections**: Utilizes local storage to display active user connections. When a new user arrives or leaves the chat room, the application leverages socket connections to inform all remaining users about the event. This ensures that everyone in the chat room is promptly notified when a new user joins or when someone departs.
<p align="center"><img src="https://github.com/Nayak-Sahil/doGossip/blob/main/frontend/public/Req-Res%20Keys.png"></p>

### 🚀 Deployment:
- **Frontend** Hosted on **Netlify**.
- **Backend** Hosted on **Render**.

## 🤝 Contributing
If you'd like to contribute to this project, feel free to open an issue or submit a pull request. Your contributions are highly appreciated!
