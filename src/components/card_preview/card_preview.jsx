import React from "react";

const CardPreview = ({ card }) => {
  console.log(card);
  return (
    <div>
      <img src={card.imgUrl} alt="" width="100px" />
      <div>text : {card.text}</div>
      <div>age : {card.age}</div>
    </div>
  );
};

export default CardPreview;
