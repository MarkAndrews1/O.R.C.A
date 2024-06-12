import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
import io from "socket.io-client";
import OrcaApi from "../api";
import "./ChatRoom.css";

const socket = io("http://localhost:3001");

function ChatRoom() {
  const { currentProvider, currentPatient } = useContext(UserContext);
  const { otherId } = useParams();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  function generateRoomId(currentProvider, currentPatient, otherId) {
    if (currentProvider) {
      return `${currentProvider.id}-${otherId}`;
    } else {
      return `${otherId}-${currentPatient.id}`;
    }
  }

  const roomId = generateRoomId(currentProvider, currentPatient, otherId);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

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

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentPatient, currentProvider, otherId, roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  async function sendMessage(content) {
    let msgData;
    if (currentPatient) {
      msgData = {
        sender: "patient",
        provider_id: otherId,
        patient_id: currentPatient.id,
        content: content,
        roomId: roomId
      };
    }

    if (currentProvider) {
      msgData = {
        sender: "provider",
        provider_id: currentProvider.id,
        patient_id: otherId,
        content: content,
        roomId: roomId
      };
    }

    try {
      socket.emit("sendMessage", msgData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  if (!messages) return <h3>Loading...</h3>;

  return (
    <div className="chat-room-container">
      {currentProvider ? <Link className="chat-room-link" to={"/provider/appointment"} >Schedule Appointment</Link> : ''}
      <div className="chat-room">
        <div className="chat-messages">
          {messages.map((msg) => (
            msg && msg.content && <ChatMessage key={msg.id} message={msg.content} sender={msg.sender} timeOfPosting={msg.timestamp} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatForm sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
