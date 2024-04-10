import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as ROUTE from "@/constants/routes";

const Navigation = () => {

  return (
    <nav class="flex items-center p-3 font-do-hyeon justify-between">
      <div class="flex items-center space-x-4">
        <div class="text-xl">
          <Link to="/">맛있닷컴</Link>
        </div>
        <ul class="flex space-x-4">
          <li><NavLink to={ROUTE.Restaurant}>가게</NavLink></li>
          <li><NavLink to={ROUTE.Review}>리뷰</NavLink></li>
        </ul>
      </div>
      <ul class="bg">
        <li><NavLink to={ROUTE.MyPage}>마이 페이지</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;