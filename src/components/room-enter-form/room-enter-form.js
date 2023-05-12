import React, { useState } from 'react';
import './room-enter-form.scss';


const RoomEnterForm = ({ onEnter, isFormHidden }) => {
  const [user, setUser] = useState("");
  const [roomName, setRoomName] = useState("");

  const onInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "user") {
      setUser(value);
    } else if (id === "roomName") {
      setRoomName(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem(roomName)) {
      const chat = JSON.parse(localStorage.getItem(roomName));
      onEnter(roomName, chat, user);
    } else {
      createRoom(roomName);
      onEnter(roomName, [], user);
    }
    console.log(!!user)
    setUser("");
    setRoomName("");
  };

  const createRoom = (roomName) => {
    localStorage.setItem(roomName, JSON.stringify([]));
  };

  return (
    !isFormHidden && (
      <form onSubmit={handleSubmit} className='enter-form' disabled={!!user}>
        <h2>Войдите в комнату</h2>
        <div className='enter-form__inputs'>
          <input type="text" id="user" value={user} onChange={onInputChange} placeholder='Ваше имя'/>
          <input type="text" id="roomName" value={roomName} onChange={onInputChange} placeholder='Название комнаты'/>
          <button type="submit" disabled={!user}>Войти</button>
        </div>
      </form>
    )
  );
};

export default RoomEnterForm;