import React, { useState } from "react";
import SocketContext from "./SocketContext";
import io from "socket.io-client";
import { useEffect } from "react";

const SocketState = (props) => {
  const [getSocket, setSocket] = useState(null);
  const [getMessage, setMessage] = useState("");
  function connectSocket() {
    // ? When front is not served from the same domain as your server, you have to pass the URL of your server in io().
    const socket = io("http://localhost:3000"); // * establishing socket connection when user confirm.
    setSocket(socket);
  }

  // for listening user's message
  useEffect(() => {
    if (getSocket) {
      getSocket.on("user_message", (data) => {
        setMessage(data);
      });
    }

    return () => {
      if (getSocket) {
        getSocket.off("user_message");
      }
    };
  });



  return (
    <SocketContext.Provider value={{ getSocket, connectSocket, getMessage, setMessage }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketState;
