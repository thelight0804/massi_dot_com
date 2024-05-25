import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as ROUTE from "@/constants/routes";
import { useSelector } from "react-redux";
import logo from "@/images/logo-full.png";
import useAuth from "@/hooks/useAuth";
import useGemini from "@/hooks/useGemini";

const Navigation = () => {
  const user = useSelector((state) => state.user); // Redux store에서 user 정보 가져오기
  const { onSignOut } = useAuth(); // useAuth 훅 사용

  const [isLogin, setIsLogin] = useState(false); // 로그인 여부
  const [isOwner, setIsOwner] = useState(false); // 점주 여부

  useEffect(() => {
    user.uid ? setIsLogin(true) : setIsLogin(false);
    user.isOwner ? setIsOwner(true) : setIsOwner(false);
  }, [user]);
  
  const handleLogout = () => {
    onSignOut();
  }

  return (
    <div className="fixed bg-white w-full top-0 left-0 z-10">
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
              <NavLink className="btn-primary" to={ROUTE.RegisterRestaurant}>
                가게 등록
              </NavLink>
            </li>
          )}
          {isLogin ? (
            <>
              <li>
                <NavLink className="btn-link" onClick={handleLogout}>
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
    </div>
  );
}

export default Navigation;