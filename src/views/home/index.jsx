import React from 'react';
import RestaurantGrid from '@/components/restaurant/RestaurantGrid';
import bannerImg from '@/images/banner-ramen.png'
import { useRestaurants } from '@/hooks';
import Preloader from '@/components/common/Preloader';

const Home = () => {
  // TODO: 자동 로그인 구현
  const { // useRestaurants 훅 사용
    restaurants,
    fetchRestaurants,
    isLoading: isLoadingRestaurants,
    error: errorRestaurants } = useRestaurants(50); //TODO: 무한 스크롤 구현 시 개수 제한 수정

  return (
    <div>
      <div className="flex w-full items-center justify-center bg-red-300 p-5 md:max-h-60 md:justify-evenly">
        <div className="text-center text-gray-800">
          <h1 className="font-do-hyeon text-3xl font-bold">맛의 표현, 리뷰의 힘</h1>
          <h1 className="font-do-hyeon text-3xl font-bold">맛있닷컴</h1>
          <p className="font-Nanum-Brush-Script pt-3 text-xl">맛있닷컴과 미식의 여정을 함께하세요.</p>
        </div>
        <img src={bannerImg} alt="banner" className="hidden md:block md:h-60 md:p-5" />
      </div>
      <div>
        {errorRestaurants ? ( // 에러 발생 시
          alert("오류가 발생했습니다. \n 페이지를 새로고침 해주세요.")
        ) : isLoadingRestaurants ? ( // 로딩 중일 때
            <div className="mt-8">
              <Preloader />
            </div>
        ) : ( // 로딩 완료 시
          <RestaurantGrid restaurants={restaurants} />
        )}
      </div>
    </div>
  );
};
export default Home;