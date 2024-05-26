import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const MyPage = () => {
  const user = useSelector((state) => state.user);
  var navigate = useNavigate();

  useEffect(() => {
    if (!user.uid) {
      alert('비정상적인 접근입니다. 이전 페이지로 이동합니다.');
      navigate(-1); // 이전 페이지로 이동
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold m-4 flex justify-center ">MyPage</h1>

      <div className="relative flex border-8 border-red-100 bg-red-100 p-8">
        
          <img className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/5 h-32 w-32 rounded-full" src="../src/images/profileImage.png"
            alt="사진" />
        </div>



      <div className="font-noto-sans-kr mt-14 md:max-w-xl md:mx-auto">
        <div className="p-4">
          <div className='flex justify-between'>
            <p className="text-xl font-bold p-2">이메일</p>
            <p className="text-xl font-bold p-2">hong@gmail.com</p>
          </div>
          <div className="border-t-2 border-red-100"></div>
          <div className='flex justify-between'>
            <p className="text-xl font-bold p-2">이름</p>
            <p className="text-xl font-bold p-2">홍길동</p>
          </div>
          <div className="border-t-2 border-red-100"></div>
          <div className='flex justify-between'>
            <p className="text-xl font-bold p-2">휴대폰 번호</p>
            <p className="text-xl font-bold p-2">010-2222-3333</p>
          </div>
          <div className="border-t-2 border-red-100"></div>
          <div className='flex justify-between'>
            <p className="text-xl font-bold p-2">주소</p>
            <p className="text-xl font-bold p-2">부산광역시 남구 대연6동</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className=" font-do-hyeon font-bold bg-red-100 hover:bg-red-200 active:bg-red-300 rounded-full p-4">
            프로필 이미지 변경
          </button>
        </div>
      </div>
    </div>
  )
};

export default MyPage;