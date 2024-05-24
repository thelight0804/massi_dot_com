import React from 'react';


const MyPage = () => {
  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold m-4 flex justify-center ">MyPage</h1>

      <div className="relative flex border-8 border-red-100 bg-red-100 p-8">
        <div className="flex-shrink-0 p-4 border-2">{/*프로필 이미지*/}
          <img className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/5 h-32 w-32 rounded-full" src="https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fCVFQSVCMCU5NSVFQyU5NSU4NCVFQyVBNyU4MHxlbnwwfHwwfHx8MA%3D%3D"
            alt="사진" />
        </div>
      </div>

      <div className="mt-14 ">
        <div className="p-4">
          <div className='flex justify-between'>
          <p className="text-xl font-bold p-2">이메일</p>
          <p className="text-xl font-bold p-2">hong@gmail.com</p>
          </div>
          <div className="border-t-2 border-red-100 md:hidden"></div>
          <div className='flex justify-between'>
          <p className="text-xl font-bold p-2">이름</p>
          <p className="text-xl font-bold p-2">홍길동</p>
          </div>
          <div className="border-t-2 border-red-100 md:hidden"></div>
          <div className='flex justify-between'>
          <p className="text-xl font-bold p-2">휴대폰 번호</p>
          <p className="text-xl font-bold p-2">010-2222-3333</p>
          </div>
          <div className="border-t-2 border-red-100 md:hidden"></div>
          <div className='flex justify-between'>
          <p className="text-xl font-bold p-2">주소</p>
          <p className="text-xl font-bold p-2">부산광역시 남구 대연6동</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MyPage;