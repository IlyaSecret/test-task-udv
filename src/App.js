import React, { useState } from "react";
import Room from './components/room/room';
import EnterForm from './components/room-enter-form/room-enter-form';

const App = () => {
  const [roomName, setRoomName] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [user, setUser] = useState("");
  const [isFormHidden, setFormHidden] = useState(false);

  const enterRoom = (roomName, chat, user) => {
    setRoomName(roomName);
    setCurrentChat(chat);
    setUser(user);
    setFormHidden(true);
  };

  const updateChat = () => {
    let isScrollDown = false;
    let div = document.querySelector('.chat');
    if (Math.round(div.scrollTop) === (div.scrollHeight - div.clientHeight)) {
      isScrollDown = true;
    }
    setCurrentChat(JSON.parse(localStorage.getItem(roomName)));
    if (isScrollDown) {
      div.scrollTop = div.scrollHeight;
    }
  };

  const exitChat = () => {
    setRoomName('');
    setCurrentChat([]);
    setFormHidden(false);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="App-main">
        <Room onUpdate={updateChat} onExit={exitChat} chat={currentChat} roomName={roomName} user={user} />
        <EnterForm onEnter={enterRoom} isFormHidden={isFormHidden}/>
      </main>
    </div>
  );
};

export default App;