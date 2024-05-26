import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/common/Navigation';
import * as ROUTES from '@/constants/routes'; // 모든 routes 경로
import * as view from '@/views'; // 모든 views 경로
import { useAuth } from '@/hooks';
import useReview from '../hooks/useReview';

const AppRouter = () => {
  useAuth();

  const { sentimentAnalysis } = useReview();
  useEffect(() => {
    sentimentAnalysis("안녕하세요. 오늘 날씨가 좋네요.");
  }, []);

  return (
    <>
      <Navigation />
      <div style={{position: 'relative', top:'96px'}}>
        <Routes>
          <Route path={ROUTES.HOME} element={<view.Home />} />
          <Route path={ROUTES.SignUp} element={<view.SignUp />} />
          <Route path={ROUTES.SignIn} element={<view.SignIn />} />
          <Route path={ROUTES.MyPage} element={<view.MyPage />} />
          <Route path={ROUTES.ViewRestaurant} element={<view.ViewRestaurant />} />
          <Route path={ROUTES.RegisterRestaurant} element={<view.RegisterRestaurant />} />
          <Route path={ROUTES.RegisterMenu} element={<view.RegisterMenu />} />
          <Route path={ROUTES.WriteReview} element={<view.WriteReview />} />
        </Routes>
      </div>
    </>
  );
}

export default AppRouter;