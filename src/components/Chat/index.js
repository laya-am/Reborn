import React, { useEffect, useState } from "react";
import { useChannel } from "../AblyReactEffect";
import { useSession } from "next-auth/react";
import { StyledTextArea } from "../StyledForm/StyledForm.styled";
import { StyledButton } from "../StyledButton/StyledButton.styled";
import { StyledDiv, StyledForm } from "./Chat.styled";

export default function Chat({userId1, userId2}){
  let inputBox = null;
  let messageEnd = null;
  const { data: session } = useSession();
  
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;
  
  // console.log("userid1",userId1);
  // console.log("userid2",userId2);
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
  // console.log({channelName});
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
      <div style={{"margin": "10px"}} key={index}>
      <p data-author={message.data.author}>
        {message.data.author}: {message.data.text}
      </p>
      </div>
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <StyledDiv>
      <div>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <StyledForm onSubmit={handleFormSubmission}>
        <StyledTextArea cols="30"
          ref={(element) => {
            inputBox = element;
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        ></StyledTextArea>
        <StyledButton
          type="submit"
          disabled={messageTextIsEmpty}
        >
          Send
        </StyledButton>
      </StyledForm>
    </StyledDiv>
  );
};
