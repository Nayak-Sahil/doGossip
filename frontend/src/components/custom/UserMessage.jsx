import React from "react";

function setPadding(length) {
  // ? This function is used to set padding based on how data is long.
  let padding = "";
  if (length > 70) {
    padding = "px-6 pt-3 pb-1";
  }
  return padding;
}

function setMessageStyle(messageType) {
  // ? This function is used to set style based on message is sent or received
  let msgStyle, selfAlgin;
  if (messageType == "sent") {
    msgStyle = "rounded-full rounded-br-none bg-gray-100 self-end";
    selfAlgin = "self-end";
  } else {
    msgStyle = "rounded-full rounded-bl-none bg-[#ceffae85] self-first";
    selfAlgin = "self-fist";
  }

  return {msgStyle, selfAlgin};
}

export default function UserMessage({ messageType, message, user, time, key }) {
  
  const {msgStyle, selfAlgin} = setMessageStyle(messageType);
  const padding = setPadding(message.length); // ! set padding when message is too long. 

  return (
    <div key={key} className="flex flex-col mt-3 w-full h-max">
      <div className={`py-3 px-5 ${msgStyle} w-max sm:max-w-[400px] max-w-[350px] h-max`}>
        <p
          className={`break-normal break-all ${padding} font-medium text-slate-900 text-sm`}
        >
          {message}
        </p>
      </div>
      <p
        className={`mt-1 text-xs ${selfAlgin} px-1 w-max font-medium text-gray-500`}
      >
        <span>{user}</span>
        <span className="ml-2">{time}</span>
      </p>
    </div>
  );
}
