import React from "react";

const RoundedImage = ({ src }) => {
  return (
    <img
      src={src}
      style={{ width: "100%", height: "300px", borderRadius: "50%", paddingTop:".5rem", paddingBottom:'.5rem' }}
      alt="Foto de perfil"
    />
  );
};

export default RoundedImage;
