import React, { useState } from 'react'

export default function UserInput({ handleJoinBtn }) {
    
        const [channelName, setChannelName] = useState("");
        const [userName, setUserName] = useState("");
        const [showError, setShowError] = useState(false);

        const handleSubmit = (e) => {
          e.preventDefault();
          if (channelName.trim().length !== 0 && userName.trim().length !== 0) {
            handleJoinBtn(channelName, userName);
            setShowError(false);
            setChannelName("");
            setUserName("");
          } else {
            setShowError(true);
          }
        };

        return (
          <div className="wrapper">
            <h1 className="header">User Input</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="Container">
              {showError && (
                <div className="errorText">Both fields are Required </div>
              )}
              <div className="input-container">
                <span className="label">Enter Channel Name</span>
                <input
                  type="text"
                  className="input"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
              </div>
              <div className="input-container">
                <span className="label">Enter your Name</span>
                <input
                  type="text"
                  value={userName}
                  className="input"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="btn">
                  Join
                </button>
              </div>
            </form>
          </div>
        );
      };