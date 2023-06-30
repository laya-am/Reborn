import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useSession } from "next-auth/react"

export default function Chat(){
  const { data: session } = useSession();
  const sender = session.user.name;

  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {
    const pusher = new Pusher("ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCkIv0tbGM54QIzy2m1LW93XmmeLUKnfxhOKmFx3MaLzsys3OvgvB52lYk3+qIqcBDN015hvNMpxN/Bef7qbEevjYz9KT3/UAc0dygmW5UcMmObD2kbreFIC0dwfDlPeZgYH0tbLEkCwi56p0/nKQjmCcmMQguPlzmNrVc5y5rFjKiV0rZewJNZsBkfXWj7FRydaWTiazjTij2fOaFJ2nYwM1GEv+TN8/IX8ufll7Uja6w4PGdCvxYf63enr+LlCdLzA6prRzMHNEAn71QdPNzTCgIoVMF6eZL3WH7W98KU7SBX4Msr711whJmvjf3irdwRROLeV+oYDSWr/a5v72kynsfCmUkfQOXKzIaEmB38qVMhmWeOxpc08+BQBANt3jLJ+QaM6DPKFbGWxYX8b55fpwJ2SnkHbFNR39afh+JGHTRHbunF7pue2jaKQzmO4NqjfuFotvNyijfpVnWO+uurlTM5hDayxWkqF729dH+HVXkTYC5gCKrQr8Kp0+xNz+VLZ/XPLm6kaz8ZgG1pSXcTUm6VSO8DpDYiSU9053lN4XnncNFkOSWCiuJdBYkrEeItD9r4Jf/SeWz6MVUfoTriTTqgq7C4XP9WNAuhk1Kc9jWj7Y2feNmsbhp2C7AO3OGV6cHL974as6J8ZfMG/JJvMuG1JiRXg1k90gTjAZQ/RQ== layaaminosharei@Layas-MacBook-Air.local", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("Reborn");

    channel.bind("chat-event", function (data) {
      setChats((prevState) => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
    });

    return () => {
      pusher.unsubscribe("Reborn");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/pusher", { message: messageToSend, sender });
  };

  return (
    <>
           <p>Hello, {sender}</p>
            <div>
              {chats.map((chat, id) => (
                  <div key={id}>
                    <p>{chat.message}</p>
                    <small>{chat.sender}</small>
                  </div>
              ))}
            </div>

                <form onSubmit={(e) => {handleSubmit(e)}}>
                 <input
                  type="text"
                 value={messageToSend}
                  onChange={(e) => setMessageToSend(e.target.value)}
                    placeholder="start typing...."
                />
      <button
        type="submit"
      >
        Send
      </button>
    </form>
    </>
  );
};