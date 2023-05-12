import React from "react";
import Media from "../media-data/media-data";
import './quote.scss';

const Quote = ({ isQuote, quoteData }) => {
  if (isQuote) {
    return (
      <div className="quote">
        <p>
          Ответить на сообщение: {quoteData.ownerMessage}
        </p>
      </div>
    );
  }
  return null;
};

export default Quote;