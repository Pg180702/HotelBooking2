import React from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
const ImageSlider = ({ imagesArray }) => {
  const [imageIndex, setImageIndex] = useState(0);
  //   const images = [];
  function showPreviousImage() {
    setImageIndex((index) => {
      if (index == 0) return imagesArray.length - 1;
      return index - 1;
    });
  }
  function showNextImage() {
    setImageIndex((index) => {
      if (index == imagesArray.length - 1) return 0;
      return index + 1;
    });
  }
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <img
        src={imagesArray[imageIndex]}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          display: "block",
          aspectRatio: "10 / 6",
        }}
      />
      <button
        style={{
          all: "unset",
          display: "block",
          position: "absolute",
          top: 0,
          bottom: 0,
          padding: "1rem",
          cursor: "pointer",
          left: 0,
          color: "black",
          width: "2rem",
          height: "2rem",
          transition: "background-color 100ms ease-in-out",
        }}
        onClick={showPreviousImage}
      >
        <ArrowBigLeft />
      </button>
      <button
        style={{
          all: "unset",
          display: "block",
          position: "absolute",
          top: 0,
          bottom: 0,
          padding: "1rem",
          cursor: "pointer",
          left: 0,
          color: "black",
          width: "2rem",
          height: "2rem",
          transition: "background-color 100ms ease-in-out",
        }}
        onClick={showNextImage}
      >
        <ArrowBigRight />
      </button>
    </div>
  );
};

export default ImageSlider;
