import React from "react";
import './media-data.scss';
const Media = ({ media }) => {
  if (media == null) {
    return null;
  }

  return <img className="textImage" src={media} alt="img" />;
};

export default Media;