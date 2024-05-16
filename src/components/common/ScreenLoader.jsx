import React from 'react';
import FadeLoader from "react-spinners/FadeLoader";

const ScreenLoader = () => {
  return (
    <div>
      <div className='fixed top-0 left-0 w-full h-screen bg-black opacity-20' />
      <div className='fixed top-1/2 left-1/2 w-full h-screen'>
        <FadeLoader
          color="#fca5a5"
          height={15}
          margin={2}
          radius={2}
          speedMultiplier={1}
          width={5}
        />
      </div>
    </div>
  );
};

export default ScreenLoader;