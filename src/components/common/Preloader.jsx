import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Preloader = () => {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader
        size={50}
        color={"#f00"}
      />
    </div>
  );
};

export default Preloader;