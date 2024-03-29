import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Footer() {
  return (
    <div className="border-t hidden sm:visible absolute bottom-0 bg-white">
      <div className="w-screen flex items-center p-2 px-10 text-center text-gray-500 justify-between text-xs">
        <p>© 2024 | All Rights Reserved</p>
        <a href="https://github.com/Nayak-Sahil" className="-order-1 sm:order-none">Made by <span className="text-slate-950 font-medium">Sahil</span></a>
      </div>
    </div>
  );
}
