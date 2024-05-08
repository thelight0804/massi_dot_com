import React from 'react';
import { useState } from 'react';
import Navigation from '@/components/common/Navigation';
import RestaurantInfomation from '@/components/restaurant/RestaurantInfomation';
import RestaurantReviews from '@/components/restaurant/RestaurantReviews';
import { useLocation } from 'react-router-dom';

const ViewRestaurant = () => {
  const { state } = useLocation();
  const restaurant = state.restaurant;

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
          <div className="border-t-4 mt-3 border-gray ..."></div>
          <div className="flex">
            <div className="w-1/2 p-4">
              <p className="text-lg"><strong>순살반반치킨</strong></p>
              <p className="text-sm"><strong>[후라이드+양념]</strong></p>
              <p className="text-sm"><strong>19,900원</strong></p>
            </div>
            <div className="w-1/2 p-4 flex justify-end">
              <img src="https://media.istockphoto.com/id/1058259316/ko/%EC%82%AC%EC%A7%84/%ED%8A%80%EA%B8%B4-%EB%B9%B5-%EA%B0%80%EB%A3%A8-%EC%9E%85%ED%9E%8C-%EB%8B%AD-%EB%82%A0%EA%B0%9C.jpg?s=612x612&w=0&k=20&c=RaKuE7T0RKYO5e-ItQWQtSFoTgtOMVikPf6OWnNKb5k="
                alt="반반치킨 사진" className="w-32 h-auto rounded-xl" />
            </div>
          </div>

          <div className="border-t-4 border-gray ..."></div>
          <div className="flex">
            <div className="w-1/2 p-4 ">
              <p className="text-lg"><strong>반반치킨</strong></p>
              <p className="text-sm">[후라이드+양념]</p>
              <p className="text-sm">19,900원</p>

            </div>
            <div className="w-1/2 p-4 flex justify-end">
              <img src="https://media.istockphoto.com/id/1270470254/ko/%EC%82%AC%EC%A7%84/%EB%8B%AD.jpg?s=612x612&w=0&k=20&c=uZxL4AishylWLNJyTXtQW12eXB75zPJsAFTSXg30uJg="
                alt="반반치킨 사진" className="w-32 h-auto rounded-xl" />
            </div>
          </div>


          <div className="border-t-4 border-gray ..."></div>
          <div className="flex">
            <div className="w-1/2 p-4">
              <p className="text-lg"><strong>두마리치킨</strong></p>
              <p className="text-sm">[후라이드1+선택1]</p>
              <p className="text-sm">19,900원</p>
            </div>
            <div className="w-1/2 p-4 flex justify-end">
              <img src="https://media.istockphoto.com/id/1439803916/ko/%EC%82%AC%EC%A7%84/%EA%B5%AC%EC%9A%B4-%EB%8B%AD-%EB%82%A0%EA%B0%9C.jpg?s=612x612&w=is&k=20&c=GXllb_4NaJhmFw-LrCkAVDdH0MqwSmlYtEKnvBqRr2Y="
                alt="반반치킨 사진" className="w-32 h-auto rounded-xl" />
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
        <RestaurantInfomation name={restaurant.name} info={restaurant.info} />
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
        <RestaurantReviews name={restaurant.name} reviews={restaurant.reviews} />
      )
    }
  ];

  return (
    <div>
      <Navigation />
      <ul className="flex space-x-4">
        {tabContArr.map((section) => section.tabTitle)}
      </ul>
      <div>{tabContArr[activeIndex].tabCont}</div>
    </div>
  );
};
export default ViewRestaurant;