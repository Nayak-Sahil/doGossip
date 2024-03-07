import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AccountContext from "@/contexts/account/AccountContext";
import MemberContext from "@/contexts/members/MemberContext";
import SocketContext from "@/contexts/socket/SocketContext";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage, useSessionStorage } from "react-use";

export function Modal({ handleclick, modalState, userName }) {
  const navigate = useNavigate();

  const modalRef = useRef();

  // Account context: managing account details
  const account = useContext(AccountContext);

  //* Member context: managing chat member details
  const membersContext = useContext(MemberContext);

  // connect socket from client side
  const getSocketContext = useContext(SocketContext);

  function handleConfirm() {
    modalRef.current.innerHTML = `<lord-icon
        src="https://cdn.lordicon.com/lzgqzxrq.json"
        trigger="loop"
        colors="primary:#ffffff,secondary:#ffffff,tertiary:#04091e,quaternary:#16a9c7"
        style="width:100px;height:100px;position:relative;top:50%;left:50%;transform:translate(-50%,-50%)">
    </lord-icon>`
    getSocketContext.connectSocket(); // connecting client socket with server.
    const userData = {
      userName: userName,
    };

    // * Fetch request is used for combining userName (from client) with socketId and other stuff that comes from server response. 
    const hitURL = ((import.meta.env.PROD) ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_LOCAL_BACK_URL) + "socketconnect"
    console.log(hitURL, " ", import.meta.env.PROD, " ", import.meta.env);
    fetch(hitURL, { 
      method: "POST",
      mode: "cors",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        // console.log(payload);
        // console.warn(getSocketContext.getMessage);
        getSocketContext.setMessage();
        account.setAccount(payload);
        membersContext.setMembers([payload]);
      });
  }

  useEffect(() => {
    if (
      getSocketContext.getSocket  &&
      account.myAccount != null &&
      modalState == true
    ) {
      const systemMessage = account.myAccount;
      const bucket = {
        isMessageBadge: true,
        message: "joined chat room.",
      };
      systemMessage.bucket = bucket;
      // console.log(getSocketContext);
      getSocketContext.getSocket.emit("system_message", systemMessage);
      navigate("/chat");
    }
  }, [getSocketContext.getSocket, account.myAccount]);

  return (
    <AlertDialog open={modalState} defaultOpen={false}>
      <Button handleClick={handleclick}>Connect</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to chat-room.</AlertDialogTitle>
          <div ref={modalRef} className="text-slate-600">
            <ul className="sm:pl-3 mt-4 sm:mt-3 text-sm">
              <li className="my-1">
                🤵 Your identity will be <b>visible to everyone</b> during the
                chat.
              </li>
              <li className="my-1">
                🌐 In the chat-room,{" "}
                <b>people from all over the world may join</b>.
              </li>
              <li className="my-1">
                📝 Keep your messages short, with a <b>maximum of 50 words</b>.
              </li>
              <li className="my-1">
                🤝 Be respectful, and{" "}
                <b>avoid messages that could harm or hurt</b> others.
              </li>
              <li className="my-1">
                🕶 Once you enter in chat-room, You{" "}
                <b>can't see existing messages</b>.
              </li>
              <li className="my-1">
                ↩ Once you leave the chat-room, You{" "}
                <b>missed all the messages.</b>.
              </li>
            </ul>
            <p className="mt-3 sm:pl-3 text-sm">🙂 Enjoy the chat...</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline">
            <a href="/">Cancel</a>
          </Button>
          <Button className={`mb-2 ${account.myAccount != null ? "hidden" : "visible"}`} handleClick={handleConfirm}>Confirm</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
