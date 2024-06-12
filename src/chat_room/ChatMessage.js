import React from "react";
import "./ChatMessage.css";

function ChatMessage({ message, sender, timeOfPosting }) {
  // Function to format the date string to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Change the date to the user's local format
  };

  return (
    <div className={`chat-message ${sender === "provider" ? "provider-message" : "patient-message"}`}>
      <div className="message-bubble">
        <div className="message-content">{message}</div>
        <div className="message-time"><small>{formatDate(timeOfPosting)}</small></div>
      </div>
    </div>
  );
}

export default ChatMessage;
