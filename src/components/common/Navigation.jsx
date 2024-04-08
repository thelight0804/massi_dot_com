import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as ROUTE from "@/constants/routes";

const Navigation = () => {

  return (
    <nav class="flex items-center p-3 bg-blue-500 font-do-hyeon">
      <div class="text-white mr-3">
        <Link to="/">맛있닷컴</Link>
      </div>
      <ul class="flex space-x-4">
        <li><NavLink to={ROUTE.Restaurant}>가게</NavLink></li>
        <li><NavLink to={ROUTE.Review}>리뷰</NavLink></li>
        <li><NavLink to={ROUTE.MyPage}>마이 페이지</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;