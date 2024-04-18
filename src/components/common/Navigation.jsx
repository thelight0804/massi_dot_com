import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as ROUTE from "@/constants/routes";
import logo from "@/images/logo-full.png";

const Navigation = () => {

  return (
    <nav class="flex items-center p-3 font-do-hyeon justify-between border-b-2 border-stone-300">
      <div class="flex items-center space-x-4">
        <div class="flex items-center justify-center w-24 h-auto">
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>
        </div>
        <ul class="flex space-x-4">
          <li><NavLink to={ROUTE.Review}>메뉴</NavLink></li>
          <li><NavLink to={ROUTE.Restaurant}>정보ㆍ원산지</NavLink></li>
        </ul>
      </div>
      <ul class="bg">
        <li><NavLink to={ROUTE.MyPage}>마이 페이지</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;