import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SocketState from "./contexts/socket/SocketState.jsx";
import AccountState from "./contexts/account/AccountState.jsx";
import MemberState from "./contexts/members/MemberState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AccountState>
    <MemberState>
      <SocketState>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SocketState>
    </MemberState>
  </AccountState>
);
