import React from 'react';

const ProgressIndicator = ({ currentPage }) => {
  return (
    <div className="flex justify-center space-x-10 pt-4">
      <div className='flex flex-col items-center'>
        <div className={`w-4 h-4 rounded-full ${currentPage === 'restaurant' || 'menu' ? 'bg-red-300' : 'bg-gray-300'}`} />
        <p className='text-center text-gray-600'>식당 등록</p>
      </div>
      <div className='flex flex-col items-center'>
        <div className={`w-4 h-4 rounded-full ${currentPage === 'menu' ? 'bg-red-300' : 'bg-gray-300'}`} />
        <p className='text-center text-gray-600'>메뉴 등록</p>
      </div>
    </div>
  );
};

export default ProgressIndicator;