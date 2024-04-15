import React from 'react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/common/Navigation';
import RestaurantGrid from '@/components/restaurant/RestaurantGrid';
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
      <div>
        {(errorRestaurants && !isLoadingRestaurants) ? (
          console.log(errorRestaurants) // 에러 메시지 출력
        ) : (
          // <RestaurantGrid restaurants={restaurants} />
          console.log(restaurants)
        )}
      </div>

    </div>
  )
};
export default Home;