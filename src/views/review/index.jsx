import React, { useState } from 'react';
import Navigation from '@/components/common/Navigation';


function Tab() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li
          key={0}
          className={`flex-1 text-lg cursor-pointer text-center ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => tabClickHandler(0)}
        >
          메뉴
        </li>
      ),
      tabCont: (
        <div>
          <div class="border-t-4 mt-3 border-gray ..."></div>
          <div class="flex">
            <div class="w-1/2 p-4">
              <p class="text-lg"><strong>순살반반치킨</strong></p>
              <p class="text-sm"><strong>[후라이드+양념]</strong></p>
              <p class="text-sm"><strong>19,900원</strong></p>
            </div>
            <div class="w-1/2 p-4 flex justify-end">
              <img src="https://media.istockphoto.com/id/1058259316/ko/%EC%82%AC%EC%A7%84/%ED%8A%80%EA%B8%B4-%EB%B9%B5-%EA%B0%80%EB%A3%A8-%EC%9E%85%ED%9E%8C-%EB%8B%AD-%EB%82%A0%EA%B0%9C.jpg?s=612x612&w=0&k=20&c=RaKuE7T0RKYO5e-ItQWQtSFoTgtOMVikPf6OWnNKb5k="
                alt="반반치킨 사진" class="w-32 h-auto rounded-xl" />
            </div>
          </div>

          <div class="border-t-4 border-gray ..."></div>
          <div class="flex">
            <div class="w-1/2 p-4 ">
              <p class="text-lg"><strong>반반치킨</strong></p>
              <p class="text-sm">[후라이드+양념]</p>
              <p class="text-sm">19,900원</p>

            </div>
            <div class="w-1/2 p-4 flex justify-end">
              <img src="https://media.istockphoto.com/id/1270470254/ko/%EC%82%AC%EC%A7%84/%EB%8B%AD.jpg?s=612x612&w=0&k=20&c=uZxL4AishylWLNJyTXtQW12eXB75zPJsAFTSXg30uJg="
                alt="반반치킨 사진" class="w-32 h-auto rounded-xl" />
            </div>
          </div>


          <div class="border-t-4 border-gray ..."></div>
          <div class="flex">
            <div class="w-1/2 p-4">
              <p class="text-lg"><strong>두마리치킨</strong></p>
              <p class="text-sm">[후라이드1+선택1]</p>
              <p class="text-sm">19,900원</p>
            </div>
            <div class="w-1/2 p-4 flex justify-end">
              <img src="https://media.istockphoto.com/id/1439803916/ko/%EC%82%AC%EC%A7%84/%EA%B5%AC%EC%9A%B4-%EB%8B%AD-%EB%82%A0%EA%B0%9C.jpg?s=612x612&w=is&k=20&c=GXllb_4NaJhmFw-LrCkAVDdH0MqwSmlYtEKnvBqRr2Y="
                alt="반반치킨 사진" class="w-32 h-auto rounded-xl" />
            </div>
          </div>


        </div>
      )
    },
    {
      tabTitle: (
        <li
          key={1}
          className={`flex-1 text-lg cursor-pointer text-center mb- ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => tabClickHandler(1)}
        >
          정보·원산지
        </li>
      ),
      tabCont: (
        <div>정보랑 원산지</div>
      )
    },
    {
      tabTitle: (
        <li
          key={2}
          className={`flex-1 text-lg cursor-pointer text-center ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => tabClickHandler(2)}
        >
          리뷰
        </li>
      ),
      tabCont: (
        <div>음식 리뷰</div>
      )
    }
  ];


  return (
    <div>
      <ul className="flex space-x-4">
        {tabContArr.map((section) => section.tabTitle)}
      </ul>
      <div>{tabContArr[activeIndex].tabCont}</div>
    </div>
  );
}

function Review() {
  return (
    <div>
      <Navigation />
      <h1>Review Page</h1>
      <br />
      <h1 className="text-2xl"><strong>← F1치킨 남구점 ㋡</strong></h1>

      <Tab />

    </div>
  )
};
export default Review;
