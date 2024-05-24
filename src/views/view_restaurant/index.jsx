import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ROUTE from "@/constants/routes";
import Infomation from '@/views/view_restaurant/components/Infomation';
import Menu from '@/views/view_restaurant/components/Menu';
import Reviews from '@/views/view_restaurant/components/Reviews';
import Preloader from '@/components/common/Preloader';

const ViewRestaurant = () => {
  const user = useSelector((state) => state.user);
  const { state } = useLocation();
  const navigate = useNavigate();
  const restaurant = state.restaurant; // 레스토랑 정보
  const [customer, setCustomer] = useState(false); // 손님 여부
  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [activeIndex, setActiveIndex] = useState(0); // 탭 인덱스

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    user.uid && !user.isOwner && setCustomer(true);
    setIsLoading(false);
  }, [user])

  if (!restaurant) {
    // FIX: 로그아웃 시 에러 발생
    alert("오류가 발생했습니다. \n 이전 페이지로 이동합니다.");
    navigate(-1);
  } else if (isLoading) {
    return (
      <div className="mt-8">
        <Preloader />
      </div>
    )
  } else {
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
          <Menu menu={restaurant.menu} info={restaurant.info} />
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
          <Infomation name={restaurant.name} info={restaurant.info} />
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
          <>
            <div className={customer ? 'mb-20' : ''}>
              <Reviews name={restaurant.name} reviews={restaurant.reviews} />
            </div>
            {customer && (
              <div className='fixed bottom-0 w-full text-center bg-white'>
                <div className="h-0.5 bg-gray-300" />
                <button className="btn-primary m-4 w-4/5" to={ROUTE.RegisterRestaurant}>
                  리뷰 작성
                </button>
              </div>
            )}
          </>
        )
      }
    ];
    return (
      <div>
        <ul className="flex space-x-4 mt-10">
          {tabContArr.map((section) => section.tabTitle)}
        </ul>
        <div>{tabContArr[activeIndex].tabCont}</div>
      </div>
    );
  };
}
export default ViewRestaurant;
