// src/components/ChatForm.js
import React, { useState } from "react";

function ChatForm({ sendMessage }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatForm;