import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as ROUTE from "@/constants/routes";
import logo from "@/images/logo-full.png";

const Navigation = () => {

  return (
    <nav className="flex items-center justify-between p-3 mb-3 font-do-hyeon">
      <div className="flex items-center space-x-4">
        <div className="flex h-auto w-24 items-center justify-center">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
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