import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as ROUTE from "@/constants/routes";
import useRestaurant from '@/hooks/useRestaurant';
import Infomation from '@/views/view_restaurant/components/Infomation';
import Menu from '@/views/view_restaurant/components/Menu';
import Reviews from '@/views/view_restaurant/components/Reviews';
import Preloader from '@/components/common/Preloader';
import useReview from '@/hooks/useReview';

const ViewRestaurant = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const { getRestaurant, isRestaurantLoading } = useRestaurant(); // useRestaurant 훅 사용
  const [restaurant, setRestaurant] = useState(null); // 식당 정보
  const [isOwner, setIsOwner] = useState(false); // 식당 관계자 여부
  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [activeIndex, setActiveIndex] = useState(0); // 탭 인덱스

  useEffect(() => {
    // 식당 정보를 가져오는 함수
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurant(id);
      if (restaurant) {
        setRestaurant(restaurant);
      } else {
        alert("식당 정보를 가져오는데 실패했습니다.");
        navigate(-1); // 메인 페이지로 이동
      }
    }
    fetchRestaurant();
  }, []);

  useEffect(() => {
    // 로그인한 사용자와 식당의 관계를 확인
    if (restaurant && user) {
      user.uid === restaurant.uid && setIsOwner(true);
      setIsLoading(false);
    }
  }, [user, restaurant])

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const onClickHandler = () => {
    navigate(ROUTE.WriteReview.replace(":id", id));
  }

  if (isLoading || isRestaurantLoading) {
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
            {restaurant.reviews ? (
              <div className={(!isOwner && user.uid) ? 'mb-44 md:mb-0' : ''}>
                <Reviews name={restaurant.name} reviews={restaurant.reviews} restaurantId={id} isOwner={isOwner} uid={user.uid} />
              </div>
            ) : (
              <div className="text-center mt-4 font-re text-gray-700">
                <p>아직 등록된 리뷰가 없어요!</p>
                <p>첫 번째로 리뷰를 작성해 보세요.</p>
              </div>
            )}
            {(!isOwner && user.uid) && (
              <div className='fixed bottom-0 w-full text-center md:text-right bg-white md:bg-transparent'>
                <div className="h-0.5 bg-gray-300 md:hidden" />
                <button className="btn-primary m-4 w-4/5 md:w-36" onClick={onClickHandler}>
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
