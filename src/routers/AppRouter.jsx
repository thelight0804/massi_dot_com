import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/common/Navigation';
import * as ROUTES from '@/constants/routes'; // 모든 routes 경로
import * as view from '@/views'; // 모든 views 경로
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path={ROUTES.HOME} element={<view.Home />} />
        <Route path={ROUTES.SignUp} element={<view.SignUp />} />
        <Route path={ROUTES.SignIn} element={<view.SignIn />} />
        <Route path={ROUTES.MyPage} element={<view.MyPage />} />
        <Route path={ROUTES.ViewRestaurant} element={<view.ViewRestaurant />} />
        <Route path={ROUTES.RegisterRestaurant} element={<view.RegisterRestaurant />} />
        <Route path={ROUTES.RegisterMenu} element={<view.RegisterMenu />} />
      </Routes>
    </>
  );
}

export default AppRouter;