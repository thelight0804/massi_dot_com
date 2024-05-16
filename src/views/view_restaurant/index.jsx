import React from 'react';
import { useState } from 'react';
import Navigation from '@/components/common/Navigation';
import RestaurantInfomation from '@/components/restaurant/RestaurantInfomation';
import RestaurantMenu from '@/components/restaurant/RestaurantMenu';
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
          className={`flex-1 text-sm pt-2 pb-2 cursor-pointer text-center 
          ${activeIndex === 0 
          ? "bg-white text-black border-t-2 border-r border-red-300 font-bold" 
          : "border-b-2 border-red-300"}`}
          onClick={() => tabClickHandler(0)}
        >
          메뉴
        </li>
      ),
      tabCont: (
        <RestaurantMenu menu={restaurant.menu} info={restaurant.info} />
      )
    },
    {
      tabTitle: (
        <li
          key={1}
          className={`flex-1 text-sm pt-2 pb-2 cursor-pointer text-center 
          ${activeIndex === 1 
            ? "bg-white text-black border-t-2 border-l border-r border-red-300 font-bold" 
            : "border-b-2 border-red-300"}`}
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
          className={`flex-1 text-sm pt-2 pb-2 cursor-pointer text-center 
          ${activeIndex === 2 
            ? "bg-white text-black border-t-2 border-l border-red-300 font-bold border-b-0" 
            : "border-b-2 border-red-300"}`}
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
      <ul className="flex space-x-4 mt-10">
        {tabContArr.map((section) => section.tabTitle)}
      </ul>
      <div>{tabContArr[activeIndex].tabCont}</div>
    </div>
  );
};
export default ViewRestaurant;