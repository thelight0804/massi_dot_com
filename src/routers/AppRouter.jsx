import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as ROUTES from '@/constants/routes'; // 모든 routes 경로
import * as view from '@/views'; // 모든 views 경로

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<view.Home />} />
    </Routes>
  );
}

export default AppRouter;