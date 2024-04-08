import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as ROUTE from "@/constants/routes";

const Navigation = () => {

  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <ul className="navigation-menu-main">
        <li><NavLink className="navigation-menu-active" to={ROUTE.HOME}>맛있닷컴</NavLink></li>
        <li><NavLink className="navigation-menu-active" to={ROUTE.Restaurant}>가게</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;