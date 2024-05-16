import React from 'react';
import FadeLoader from "react-spinners/FadeLoader";

const Preloader = () => {
  return (
    <div className="flex items-center justify-center">
      <FadeLoader
        color="#fca5a5"
        height={15}
        margin={2}
        radius={2}
        speedMultiplier={1}
        width={5}
      />
    </div>
  );
};

export default Preloader;