require('dotenv').config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();

app.use(cors()); // ? this middleware is used for allowing CORS from all.
app.use(express.json()); // ? this middleware is used for accepting by default json data when user sent post request containing with json data.

// ? created httpserver using http (core-modules) to pass in socket-server.
const httpServer = http.createServer(app);

const allowedOrigin = (process.env.NODE_ENV === "production" ) ? process.env.NODE_ENV_PRODUCTION_URL : process.env.NODE_ENV_LOCAL_FRONT_URL;
// const allowedOrigin = "http://localhost:5173";

const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigin,
        methods: ["GET", "POST"],
    }
});

const connectionDetails = { socketId: 0, connectedAt: null };
io.on("connection", (socket) => {
    connectionDetails.socketId = socket.id;
    connectionDetails.connectedAt = io.sockets.sockets.get(socket.id).handshake.time;

    socket.on("system_message", (message) => {
        io.emit("user_message", message);
    })

    // ? Message received from clients
    socket.on("user_message", (message) => {
        // console.log(message)
        // ? Now, transmit the message to all other client except sender.
        io.emit("user_message", message);
    })

    socket.on("disconnecting", () => {
        const leavedUser = {
            socketId: socket.id,
            bucket:{
                isMessageBadge: true,
                message: "Someone leaved chat room."
            }
        }
        io.emit("user_message", leavedUser);
        // console.log(socket.rooms); // the Set contains at least the socket ID
    });

    socket.on("disconnect", () => {
        console.log("user disconnected. " + socket.id);
    })

});

app.post("/socketconnect", (req, res) => {
    const { userName } = req.body;
    connectionDetails.userName = userName;
    connectionDetails.isActive = true;
    // console.log(connectionDetails);
    res.json(connectionDetails);
})

app.get("/test", (req, res) => {
    res.json(process.env);
})


const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`SERVER RUNNING ON ${PORT}`));

// module.exports = app;