
import Pusher from "pusher-js";
import ChatInput from "../UserInput";
import ChatList from "../ChatList";
import { useEffect, useState } from "react";

export default function ChatScreen({ channelName, userName }){
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState();

  useEffect(() => {
    const pusher = new Pusher("079937a0066e903e3ef", {
      cluster: "eu",
      encrypted: true,
    });
    console.log({pusher});
    
    const channel = pusher.subscribe(channelName);
    channel.bind("message", (data) => {
      setMsg(data);
    });
    return () => {
      pusher.unsubscribe(channelName);
    };
  }, []);

  useEffect(() => {
    if (msg) setChats([...chats, msg]);
  }, [msg]);

  return (
    <div className="wrapper">
        <h2>Chat Screen:</h2>
      <div className="container">
        <div className="userProfile">Hello, {userName}</div>
        <ChatList chats={chats} username={userName} />
        <ChatInput channelName={channelName} username={userName} />
      </div>
    </div>
  );
};

