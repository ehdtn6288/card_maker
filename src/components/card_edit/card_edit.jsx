import React, { useState } from "react";

const CardEdit = ({ card, update, onDelete }) => {
  const handleChange = (e) => {
    const word = e.target.value;
    const name = e.target.name;
    const newData = { ...card, [name]: word };
    update(newData, card.cardId);
  };

  const handleDelete = () => {
    onDelete(card.cardId);
  };
  const changeImg = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lsqskdup");
    const config = {
      method: "post",
      body: formData,
    };
    fetch(`https://api.Cloudinary.com/v1_1/db59p4fpz/image/upload/`, config)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = { ...card, imgUrl: result.secure_url };
        update(newData, card.cardId);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <img src={card.imgUrl} alt="" width="100px" />
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
        <input type="file" name="imgUrl" onChange={changeImg} />
        <button onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
};

export default CardEdit;
