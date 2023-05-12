import React from "react";
import EmojiPicker, { EmojiStyle, Categories } from "emoji-picker-react";

const EmojiPickerComponent = ({ show, onClick }) => {
  return (
    show && (
      <EmojiPicker
        onEmojiClick={onClick}
        autoFocusSearch={false}
        searchDisabled
        skinTonesDisabled
        previewConfig={{
          showPreview: false,
        }}
        lazyLoadEmojis={true}
        emojiStyle={EmojiStyle.APPLE}
        categories={[
          {
            name: "Recent",
            category: Categories.SUGGESTED,
          },
          {
            name: "Emotions",
            category: Categories.SMILEYS_PEOPLE,
          },
          {
            name: "Animals",
            category: Categories.ANIMALS_NATURE,
          },
          {
            name: "Food and Drinks",
            category: Categories.FOOD_DRINK,
          },
          {
            name: "Travel and Transport",
            category: Categories.TRAVEL_PLACES,
          },
          {
            name: "Sport and Activities",
            category: Categories.ACTIVITIES,
          },
          {
            name: "Tools",
            category: Categories.OBJECTS,
          },
          {
            name: "Symbols",
            category: Categories.SYMBOLS,
          },
          {
            name: "Flags",
            category: Categories.FLAGS,
          },
        ]}
      />
    )
  );
};

export default EmojiPickerComponent;