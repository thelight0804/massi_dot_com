import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as ROUTE from "@/constants/routes";
import logo from "@/images/logo-full.png";

const Navigation = () => {

  return (
    <nav className="flex items-center justify-between border-b-2 border-stone-300 p-3 font-do-hyeon">
      <div className="flex items-center space-x-4">
        <div className="flex h-auto w-24 items-center justify-center">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li><NavLink to={ROUTE.Review}>메뉴</NavLink></li>
          <li><NavLink to={ROUTE.Restaurant}>정보ㆍ원산지</NavLink></li>
        </ul>
      </div>
      <ul className="flex items-center gap-5">
        <li >
          <NavLink
            className="rounded-md bg-red-500 px-4 py-4 text-white" 
            to={ROUTE.RegisterRestaurant}>식당 등록</NavLink>
        </li>
        <li>
          <NavLink to={ROUTE.MyPage}>마이 페이지</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;