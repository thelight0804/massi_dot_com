import React from 'react';
import Navigation from '@/components/common/Navigation';
import RestaurantGrid from '@/components/restaurant/RestaurantGrid';
import bannerImg from '@/images/banner-ramen.png'
import { useRestaurants } from '@/hooks';

const Home = () => {
  const { // useRestaurants 훅 사용
    restaurants,
    fetchRestaurants, 
    isLoading: isLoadingRestaurants,
    error: errorRestaurants } = useRestaurants(6);

  return (
    <div>
      <Navigation />
      <div className="flex w-full items-center justify-center bg-red-300 p-5 md:max-h-60 md:justify-evenly">
        <div className="text-center text-gray-800">
          <h1 className="font-do-hyeon text-3xl font-bold">맛의 표현, 리뷰의 힘</h1>
          <h1 className="font-do-hyeon text-3xl font-bold">맛있닷컴</h1>
          <p className="font-Nanum-Brush-Script pt-3 text-xl">맛있닷컴과 미식의 여정을 함께하세요.</p>
        </div>
        <img src={bannerImg} alt="banner" className="hidden md:block md:h-60 md:p-5" />
      </div>
      <div>
        {errorRestaurants && !isLoadingRestaurants ? (
          console.log(errorRestaurants) // 에러 메시지 출력
        ) : (
          <RestaurantGrid restaurants={restaurants} />
        )}
      </div>
    </div>
  );
};
export default Home;