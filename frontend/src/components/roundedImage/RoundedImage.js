import React from "react";
import Skeleton from "../skeleton/Skeleton";

const RoundedImage = ({ src }) => {
  const [loading, setLoading] = React.useState(true);

  function handleLoad(e) {
    setLoading(false);
    e.target.style.opacity = "1";
  }

  return (
    <div style={{ height: "300px", overflow: "hidden" }}>
      {loading ? <Skeleton borderRadius="50%" height="300px" /> : null}
      <img
        onLoad={handleLoad}
        src={src}
        style={{
          width: "100%",
          height: "300px",
          borderRadius: "50%",
          paddingTop: ".5rem",
          paddingBottom: ".5rem",
          opacity: "0",
        }}
        alt="Foto de perfil"
      />
    </div>
  );
};

export default RoundedImage;
