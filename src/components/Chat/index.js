import React, { useEffect, useState } from "react";
import { useChannel } from "../AblyReactEffect";
import styles from "./Chat.module.css";
import { useSession } from "next-auth/react";

export default function Chat({userId1, userId2}){
  let inputBox = null;
  let messageEnd = null;
  const { data: session } = useSession();
  
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;
  
  console.log("userid1",userId1);
  console.log("userid2",userId2);
  function getChannelID(str1, str2) {
    const sortedStrings = [str1, str2].sort();
    const concatenatedString = sortedStrings.join('');
    return concatenatedString;
  }

  useEffect(() => {
    channel.history((err, result) => {
      setMessages(result.items)
    })
  }, []);

  const channelName = getChannelID(userId1, userId2);
  console.log({channelName});
  const [channel, ably] = useChannel(channelName, (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText) => {
    channel.publish(channelName, {text: messageText, author: session.user.name});
    setMessageText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
   
    return (
      <span key={index} className={styles.message} data-author={message.data.author}>
        {message.data.text} author: {message.data.author}
      </span>
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={(element) => {
            inputBox = element;
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textarea}
        ></textarea>
        <button
          type="submit"
          className={styles.button}
          disabled={messageTextIsEmpty}
        >
          Send
        </button>
      </form>
    </div>
  );
};
