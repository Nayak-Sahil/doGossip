import { faCircleLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChatCount } from "./ChatCount";
import { Setting } from "./Setting";
import MessageBadge from "./MessageBadge";
import UserMessage from "./UserMessage";
import SocketContext from "@/contexts/socket/SocketContext";
import AccountContext from "@/contexts/account/AccountContext";
import { Link, useNavigate } from "react-router-dom";
import MemberContext from "@/contexts/members/MemberContext";

export default function Chat() {
  //* Account context: managing account details
  const account = useContext(AccountContext);

  //* Member context: managing chat member details
  const membersContext = useContext(MemberContext);

  //* get connected socket instance from context
  const getSocketContext = useContext(SocketContext);

  //* this state is for input value
  const [message, setMessage] = useState("");

  //* this state is for socket listener message
  const [receivedMessage, setReceivedMessage] = useState([]);

  //* useRef for taking message input for keydown listener
  const messageInpt = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e)=>{
      if (e.key === "Enter") {
        handleSendMessage();
      }
    }

    messageInpt.current.addEventListener("keydown", handleKeyDown);

    return () => messageInpt.current && messageInpt.current.removeEventListener("keydown", handleKeyDown);
  }, [message]);

  useEffect(() => {
    if (
      getSocketContext.getSocket == null ||
      account.myAccount == null ||
      !account.myAccount
    ) {
      membersContext.setMembers([]);
      navigate("/");
    }
  }, [getSocketContext.getSocket, account.myAccount]);

  function handleBack() {
    const isConfirm = confirm("Are you sure you want to leave room?");
    if (isConfirm) {
      const systemMessage = account.myAccount;
      const bucket = {
        isMessageBadge: true,
        message: "leaved chat room.",
      };
      systemMessage.bucket = bucket;
      getSocketContext.getSocket.emit("system_message", systemMessage);
      getSocketContext.getSocket.disconnect();
      account.resetSession();
      setReceivedMessage([]);
      getSocketContext.setMessage("");
      membersContext.setMembers([]);
      navigate("/");
    }
  }

  function handleSendMessage() {
    //* add new pair for message with account details.
    console.warn(message);
    if (message == "") return; 
    const bucket = {
      isMessageBadge: false,
      message,
    };
    account.myAccount.bucket = bucket;
    // console.warn(account.myAccount);

    // sent user message to server then server broadcast this message to all other user.
    const socket = getSocketContext.getSocket;
    socket.emit("user_message", account.myAccount);

    setMessage(""); // once message sent to server empty input
  }

  //* This method is used for emmiting message about when user change their name
  function sendAccountMessage() {
    const systemMessage = account.myAccount;
    const bucket = {
      isMessageBadge: true,
      message: "changed name",
    };
    systemMessage.bucket = bucket;
    getSocketContext.getSocket.emit("system_message", systemMessage);
    // const updatedAccount = account.myAccount;
    // delete updatedAccount.prevName;
    // account.setAccount(account.myAccount);
  }

  // ? This effect is used for receiving user message
  useEffect(() => {
    if (getSocketContext.getMessage) {
      const finalMessage = getSocketContext.getMessage;
      // console.error(finalMessage);

      let isMember = false;
      let idx = -1;
      if (membersContext.getMembers.length != 0) {
        Array.from(membersContext.getMembers).forEach((member, index) => {
          if (member.socketId == finalMessage.socketId) {
            isMember = true;
            idx = index;
          }
        });
      }

      if (idx != -1) {
        const updatedMember = membersContext.getMembers;
        updatedMember.splice(idx, 1);
        updatedMember.push(finalMessage);
        if (finalMessage.bucket.message == "leaved chat room.") {
          updatedMember.splice(idx, 1);
        }
      }

      if (
        !isMember &&
        finalMessage.bucket.messagge != "Someone leaved chat room."
      ) {
        let newChatMember = finalMessage;
        membersContext.setMembers([
          ...membersContext.getMembers,
          newChatMember,
        ]);
      }

      if (getSocketContext.getMessage.socketId == account.myAccount.socketId) {
        finalMessage.isSender = true;
      } else {
        finalMessage.isSender = false;
      }

      setReceivedMessage([...receivedMessage, finalMessage]);
    }

    return getSocketContext.setMessage("");
  }, [getSocketContext.getMessage, account.myAccount]);

  // ? This Effect is used to scroll bottom automatically when new message arrived
  const chatWrapperRef = useRef(null);
  useEffect(() => {
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  }, [chatWrapperRef, receivedMessage]);

  // * handling input value with state
  function handleOnChange(e) {
    setMessage(e.target.value);
  }

  return (
    <section className="relative w-full top-3 h-[80%] flex flex-col items-center justify-between">
      <div
        className="flex flex-col items-center justify-between z-[3] mx-auto w-[80vw] md:w-[40vw] h-full bg-white/30 bg-opacity-30 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-xl"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <header className="w-full h-[12%] flex items-center justify-between border-b border-gray-200 p-4">
          <button onClick={handleBack} className="text-lg">
            <FontAwesomeIcon className="text-gray-700" icon={faCircleLeft} />
          </button>
          <p className="text-slate-900 md:text-sm text-center text-xs">
            <span className="text-gray-600 text-[12px]">
              Currently, {membersContext.getMembers.length} members online.
            </span>
            <br></br>
            <ChatCount />
          </p>
          <div>
            <Setting handleEmitMessage={sendAccountMessage} />
          </div>
        </header>
        <main
          ref={chatWrapperRef}
          className="w-full h-[80%] flex flex-col items-center overflow-y-scroll custom-scroll border-gray-200 p-4"
        >
          {receivedMessage.map((chat, index) => {
            return chat.bucket.isMessageBadge ? (
              chat.userName == account.myAccount.userName ? (
                <MessageBadge
                  key={index}
                  message={"You " + chat.bucket.message}
                />
              ) : chat.bucket.message === "changed name" ? (
                <MessageBadge
                  key={index}
                  message={
                    chat.prevName +
                    " " +
                    chat.bucket.message +
                    " to " +
                    chat.userName
                  }
                />
              ) : (
                <MessageBadge
                  key={index}
                  message={chat.userName + " " + chat.bucket.message}
                />
              )
            ) : (
              <UserMessage
                key={index}
                messageType={chat.isSender ? "sent" : "received"}
                message={chat.bucket.message}
                user={chat.userName}
              />
            );
          })}
        </main>
        <footer className="w-full h-[12%] flex items-center justify-between py-4 px-2">
          <div className="w-[90%] md:mr-0 mr-2">
            <Input
              id="messageInpt"
              ref={messageInpt}
              value={message}
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Hello friends.."
            />
          </div>
          <Button handleClick={handleSendMessage} variant="outline">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </footer>
      </div>
    </section>
  );
}
