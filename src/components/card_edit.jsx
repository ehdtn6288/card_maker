import React from "react";

const CardEdit = ({ card, update }) => {
  const handleChange = (e) => {
    const word = e.target.value;
    const name = e.target.name;
    const newData = { ...card, [name]: word };
    update(newData, card.cardId);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          onChange={handleChange}
          name="text"
          value={card.text}
        />
        <input
          type="text"
          onChange={handleChange}
          name="age"
          value={card.age}
        />
      </form>
    </div>
  );
};

export default CardEdit;
