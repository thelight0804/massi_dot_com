import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useAuth } from '@/hooks';
import ScreenLoader from '@/components/common/ScreenLoader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileEdit = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { profileUpdate, isAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user.uid !== location.state.uid) {
      alert('비정상적인 접근입니다. 이전 페이지로 이동합니다.');
      navigate(-1);
    }
    setIsLoading(false);
  }, [])

  return (
    <div className="m-4 mx-auto md:w-4/5">
      {(isLoading || isAuthLoading) && <ScreenLoader />}
      <div className="m-4 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">프로필 수정</h3>
        <Formik
          initialValues={{
            name: user.name, // 이름
            email: user.email, // 이메일
            phoneNumber: user.phoneNumber, // 전화번호
            address: user.address, // 주소
            isOwner: user.isOwner, // 식당 관리자 여부
            uid: user.uid, // 사용자 고유 식별자
            profileImage: user.profileImage, // 프로필 이미지
          }}
          onSubmit={(values) => {
            profileUpdate(values);
          }}
        >
          {({setFieldValue}) => (
            <Form className="block md:flex md:justify-evenly">
              <div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="name" >
                    이름
                  </label>
                  <Field
                    name="name"
                    type="text" // input 태그의 type 속성
                    label="이름" // input 태그의 label 속성
                    placeholder={user.name} // 힌트
                    className="w-full border py-2 text-center"
                    required // 필수 입력 여부
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="email" >
                    이메일
                  </label>
                  <Field
                    name="email"
                    type="email"
                    label="이메일"
                    placeholder={user.email}
                    className="w-full border py-2 text-center"
                    pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}"
                    required
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="password" >
                    비밀번호
                  </label>
                  <Field
                    name="password"
                    type="password"
                    label="비밀번호"
                    placeholder="******"
                    className="w-full border py-2 text-center"
                    pattern=".{6,}"
                    disabled
                  />
                </div>
              </div>
              <div className="w-0.5 md:mx-2 bg-gray-100" />
              <div className="md:w-1/3 md:relative">
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="phoneNumber" >
                    전화번호
                  </label>
                  <Field
                    name="phoneNumber"
                    type="tel"
                    label="전화번호"
                    placeholder={user.phoneNumber}
                    className="w-full border py-2 text-center"
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    required
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="address">
                    주소
                  </label>
                  <Field
                    name="address"
                    type="text"
                    label="주소"
                    placeholder={user.address}
                    className="w-full border py-2 text-center"
                    required
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="image">
                    프로필 이미지
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    label="프로필 이미지"
                    className="w-full border py-2 text-center"
                    onChange={(event) => {
                      setFieldValue('profileImage', event.currentTarget.files[0]);
                    }}
                  />
                </div>
                <div className="block md:inset-x-0 md:bottom-0 md:flex md:space-x-4">
                  <button type="submit" className="btn-secondary w-full mt-4">
                    수정
                  </button>
                  <button
                    type="button"
                    className="btn-gray w-full mt-4"
                    onClick={() => {
                      navigate(-1); // 이전 페이지로 이동
                    }}
                  >
                    이전
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProfileEdit;