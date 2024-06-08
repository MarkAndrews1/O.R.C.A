import React from "react";
import "./ChatMessage.css";

function ChatMessage({ message, sender }) {
  return (
    <div className={`chat-message ${sender === "provider" ? "provider-message" : "patient-message"}`}>
      <div className="message-bubble">
        <div className="message-content">{message}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
