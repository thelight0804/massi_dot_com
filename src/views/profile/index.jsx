import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as ROUTE from "@/constants/routes";
import { IconContext } from "react-icons";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.uid) {
      alert("비정상적인 접근입니다. 이전 페이지로 이동합니다.");
      navigate(-1); // 이전 페이지로 이동
    }
    console.log(user);
  }, [user]);

  const onClickEditProfileHandler = () => {
    navigate(ROUTE.ProfileEdit, { state: { uid: user.uid } });
  }

  return (
    <div>
      <h1 className="m-4 text-2xl font-bold text-center">MyPage</h1>
      <div className="md:flex md:items-center md:justify-evenly">
        <div className="relative h-32 bg-red-100 md:static">
          {user.profileImage ? (
            <img
              className="absolute left-1/2 top-1/2 -translate-x-1/2 md:left-0 md:top-0 md:translate-x-0 h-32 w-32 rounded-full"
              src={user.profileImage}
              alt="프로필 사진"
            />
          ) : (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
              <IconContext.Provider value={{ color: "#fca5a5" }}>
                <FaRegUser className="h-32 w-32 rounded-full" />
              </IconContext.Provider>
            </div>
          )}
        </div>
        <div className="mt-14 font-noto-sans-kr">
          <div className="p-4">
            <div className="flex justify-between">
              <p className="p-2 text-xl font-bold">이메일</p>
              <p className="p-2 text-xl">{user.email}</p>
            </div>
            <div className="border-t-2 border-red-100"></div>
            <div className="flex justify-between">
              <p className="p-2 text-xl font-bold">이름</p>
              <p className="p-2 text-xl">{user.name}</p>
            </div>
            <div className="border-t-2 border-red-100"></div>
            <div className="flex justify-between">
              <p className="p-2 text-xl font-bold">휴대폰 번호</p>
              <p className="p-2 text-xl">{user.phoneNumber}</p>
            </div>
            <div className="border-t-2 border-red-100"></div>
            <div className="flex justify-between">
              <p className="p-2 text-xl font-bold">주소</p>
              <p className="p-2 text-xl">{user.address}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className=" rounded-full bg-red-100 p-4 font-do-hyeon font-bold hover:bg-red-200 active:bg-red-300"
              onClick={onClickEditProfileHandler}
            >
              프로필 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
