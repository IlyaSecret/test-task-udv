import React, { useState } from "react";
import './room.scss';
import EmojiPickerComponent from "../emoji-picker/emoji-picker";
import Quote from "../quote-item/quote";
import Message from "../message-item/message";
import {IoSend} from 'react-icons/io5'
import {BsEmojiLaughing} from 'react-icons/bs';
import {BsFillImageFill} from 'react-icons/bs';

const Room = ({ roomName, chat, user, onUpdate, onExit }) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [quote, setQuote] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleExitClick = () => {
    onExit();
  };

  const onEmojiSelect = (EmojiClickData) => {
    const updatedText = text + EmojiClickData.emoji;
    setText(updatedText);
    setShowEmojiPicker(false);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(file);
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const makeQuote = (event) => {
    const message = event.currentTarget;
    const author = message.querySelector(".current-message .author").textContent;
    const text = message.querySelector(".current-message .text").textContent;
    const media = message.querySelector(".current-message .textImage");
    let src;
    if (media) {
      src = message.querySelector(".current-message .textImage").getAttribute("src");
    }
    const data = { id: message.id, ownerMessage: author, quoteMessage: text, media: src };
    setQuote(data);
    setIsQuote(true);
  };

  if (roomName === "") {
    return "";
  }

  const existingData = chat || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      return;
    }

    const id = existingData.length === 0 ? 1 : existingData[existingData.length - 1].id + 1;
    const newData = [
      ...existingData,
      { id, author: user, text, quote, media: imageUrl },
    ];
    localStorage.setItem(roomName, JSON.stringify(newData));

    setText("");
    setShowEmojiPicker(false);
    setIsQuote(false);
    setQuote({});
    setSelectedImage(null);
    setImageUrl(null);
    onUpdate();
  };

  return (
    <div className="room">
      <div class="room-header">
        <h2>Комната {roomName}</h2>
          <button id="exit-button" type="button" onClick={handleExitClick}>
          Выйти
          </button>
      </div>
      
      <div className="chat">
        {existingData.map((message) => (
          <div
            id={message.id}
            className={message.author === user ? "my-message" : "other-message"}
            key={message.id}
            onClick={makeQuote}
          >
            <Message author={message.author} text={message.text} quote={message.quote} media={message.media} />
          </div>
        ))}
      </div>
      <Quote isQuote={isQuote} quoteData={quote} />
      <form id="chat-room-form" onSubmit={handleSubmit}>
      <input className="media-input" type="file" accept="image/*" onChange={onImageChange} id='file-input'/>
      <label htmlFor="file-input" className="file-input__label">
        <BsFillImageFill></BsFillImageFill>
      </label>
        <input
          type="text"
          placeholder="Написать сообщение"
          id="message"
          className="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <BsEmojiLaughing className="icon"></BsEmojiLaughing>
        </button>
        <button type="button" onClick={handleSubmit}>
          <IoSend className="icon"></IoSend>
        </button>
      </form>
    
      <EmojiPickerComponent show={showEmojiPicker} onClick={onEmojiSelect} />
    </div>
  );
};

export default Room;