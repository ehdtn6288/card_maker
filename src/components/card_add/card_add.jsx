import React, { useState } from "react";

const CardAdd = ({ addCard }) => {
  const [img, setImg] = useState();
  const getImg = (e) => {
    console.log(e.target.files[0], "file");
    setImg(e.target.files[0]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    const age = e.target[1].value;
    console.log(text, age, "1111");

    if (img) {
      //업로드 할 이미지가 있을때.
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "lsqskdup");
      const config = {
        method: "post",
        body: formData,
      };
      fetch(`https://api.Cloudinary.com/v1_1/db59p4fpz/image/upload/`, config)
        .then((res) => res.json())
        .then((result) => addCard(text, age, result.secure_url))
        .catch((error) => console.log(error));
    } else {
      // 업로드할 이미지가 없을때.
      addCard(text, age, null);
    }
  };
  return (
    <>
      <form onSubmit={handleAdd} onChange={(e) => console.log(e.target.value)}>
        <input type="text" name="text" />
        <input type="text" name="age" />
        <input type="file" name="img" id="" onChange={getImg} />
        <button type="submit">추가</button>
      </form>
    </>
  );
};

export default CardAdd;
