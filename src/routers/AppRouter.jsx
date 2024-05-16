import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as ROUTES from '@/constants/routes'; // 모든 routes 경로
import * as view from '@/views'; // 모든 views 경로

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<view.Home />} />
      <Route path={ROUTES.SignUp} element={<view.SignUp />} />
      <Route path={ROUTES.MyPage} element={<view.MyPage />} />
      <Route path={ROUTES.ViewRestaurant} element={<view.ViewRestaurant />} />
      <Route path={ROUTES.RegisterRestaurant} element={<view.RegisterRestaurant />} />
      <Route path={ROUTES.RegisterMenu} element={<view.RegisterMenu />} />
    </Routes>
  );
}

export default AppRouter;