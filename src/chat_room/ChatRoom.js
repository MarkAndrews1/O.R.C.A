import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import OrcaApi from "../api";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import "./ChatRoom.css";

function ChatRoom() {
  const { currentProvider, currentPatient } = useContext(UserContext);
  const { otherId } = useParams();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllMessages() {
      let fetchedMessages = [];
  
      if (currentPatient) {
        fetchedMessages = await OrcaApi.getMessages({ provider_id: otherId, patient_id: currentPatient.id });
      }
  
      if (currentProvider) {
        fetchedMessages = await OrcaApi.getMessages({ provider_id: currentProvider.id, patient_id: otherId });
      }
  
      if (fetchedMessages && fetchedMessages.messages) {
        setMessages(fetchedMessages.messages);
      }
    }
  
    getAllMessages();
  }, [currentPatient, currentProvider, otherId]);

  async function sendMessage(content) {
    let msgData;
    if (currentPatient) {
      msgData = {
        sender: "patient",
        provider_id: otherId,
        patient_id: currentPatient.id,
        content: content
      }
    }
  
    if (currentProvider) {
      msgData = {
        sender: "provider",
        provider_id: currentProvider.id,
        patient_id: otherId,
        content: content
      }
    }
  
    try {
      const res = await OrcaApi.postMessage(msgData);
      const newMessage = res.message;
  
      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  
  if (!messages) return <h3>Loading...</h3>;

  return (
    <div className="chat-room-container">
      <div className="chat-room">
      <div className="chat-messages">
  {messages.map((msg) => (
    msg && msg.content && <ChatMessage key={msg.id} message={msg.content} sender={msg.sender} />
  ))}
</div>
        <ChatForm sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
