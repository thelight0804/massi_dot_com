import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as ROUTE from "@/constants/routes";
import logo from "@/images/logo-full.png";
import { useSelector } from "react-redux";

const Navigation = () => {
  const user = useSelector((state) => state.user); // Redux store에서 user 정보 가져오기
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부
  const [isOwner, setIsOwner] = useState(false); // 점주 여부

  useEffect(() => {
    if (user.uid) setIsLogin(true);
    if (user.isOwner) setIsOwner(true);
  }, [user]);

  return (
    <nav className="mb-3 flex items-center justify-between p-3 font-do-hyeon">
      <div className="flex items-center space-x-4">
        <div className="flex h-auto w-24 items-center justify-center">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <ul className="flex items-center gap-5">
        {isOwner && (
          <li>
            <NavLink className="btn-primary" to={ROUTE.RegisterMenu}>
              메뉴 등록
            </NavLink>
          </li>
        )}
        {isLogin ? (
          <>
            <li>
              <NavLink className="btn-link" onClick={() => console.log('asdf')}>
                로그아웃
              </NavLink>
            </li>
            <li>
              <NavLink className="btn-link" to={ROUTE.MyPage}>
                마이 페이지
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink className="btn-primary" to={ROUTE.SignUp}>
                회원가입
              </NavLink>
            </li>
            <li>
              <NavLink className="btn-link" to={ROUTE.SignIn}>
                로그인
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;