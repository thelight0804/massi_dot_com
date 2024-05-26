import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as ROUTE from "@/constants/routes";
import { Field, Form, Formik } from 'formik';
import ProgressIndicator from '@/components/common/ProgressIndicator';

const RegisterRestaurant = () => {
  var navigate = useNavigate(); // react-router에서 사용하는 hook
  const user = useSelector((state) => state.user); // Redux store에서 user 정보 가져오기

  useEffect(() => {
    if (!user.uid) {
      alert('비정상적인 접근입니다. 이전 페이지로 이동합니다.');
      navigate(-1); // 이전 페이지로 이동
    }
  }, [user]);

  return (
    <div className="m-4 mx-auto md:w-4/5">
      <ProgressIndicator currentPage="restaurant" />
      <div className="m-4 mb-0 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">식당 등록</h3>
        <Formik
          initialValues={{
            name: "", // 식당 이름
            mainMenu: "", // 대표 메뉴
            info: {
              address: "", // 주소
              openTime: "", // 오픈 시간
              closeTime: "", // 마감 시간
              phoneNumber: "", // 전화번호
              closedDay: "", // 휴무일
              // FIXME: closedDay 데이터가 저장되지 않음
            },
          }}
          onSubmit={(values) => {
            // RegisterMenu 페이지로 이동
            navigate(ROUTE.RegisterMenu, { state: { restaurantInfo: values } });
          }}
        >
          {({setFieldValue}) => (
            <Form className="md:flex justify-evenly">
              <div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="name">
                    식당 이름
                  </label>
                  <Field
                    name="name"
                    type="text" // input 태그의 type 속성
                    label="식당 이름" // input 태그의 label 속성
                    placeholder="맛있는 식당" // 힌트
                    className="w-full border py-2 text-center"
                    required // 필수 입력 여부
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="mainMenu">
                    대표 메뉴
                  </label>
                  <Field
                    name="mainMenu"
                    type="text"
                    label="대표 메뉴"
                    placeholder="김치찌개"
                    className="w-full border py-2 text-center"
                    required
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="address">
                    주소
                  </label>
                  <Field
                    name="info.address"
                    type="text"
                    label="주소"
                    placeholder="서울시 강남구"
                    className="w-full border py-2 text-center"
                    required
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="openTime">
                    오픈 시간
                  </label>
                  <div className="flex items-center justify-center">
                    <Field
                      name="info.openTime"
                      as="select"
                      className="w-full border py-2 text-center"
                      required
                    >
                      {[...Array(24).keys()].map((hour) => {
                        return (
                          <option key={hour} value={hour + ":00"}>
                            {hour}:00
                          </option>
                        );
                      })}
                    </Field>
                    <p className="mx-2">~</p>
                    <Field
                      name="info.closeTime"
                      as="select"
                      className="w-full border py-2 text-center"
                      required
                    >
                      {[...Array(24).keys()].map((hour) => {
                        return (
                          <option key={hour} value={hour + ":00"}>
                            {hour}:00
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 w-0.5 mx-2" />
              <div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="phoneNumber">
                    전화번호
                  </label>
                  <Field
                    name="info.phoneNumber"
                    type="tel"
                    label="전화번호"
                    placeholder="010-1234-5678"
                    className="w-full border py-2 text-center"
                    pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}" // 전화번호 형식
                    required
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="closedDay">
                    휴무일
                  </label>
                  <Field
                    name="info.closedDay"
                    as="select"
                    className="w-full border py-2 text-center"
                    required
                  >
                    {[
                      "월요일",
                      "화요일",
                      "수요일",
                      "목요일",
                      "금요일",
                      "토요일",
                      "일요일",
                    ].map((day) => {
                      return (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="image">
                    간판 이미지
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    label="간판 이미지"
                    className="w-full border py-2 text-center"
                    required
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-secondary w-full mt-4"
                >
                  다음
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default RegisterRestaurant;