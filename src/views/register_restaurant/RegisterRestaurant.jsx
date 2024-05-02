import React from 'react';
import Navigation from '@/components/common/Navigation';
import ProgressIndicator from '@/components/common/ProgressIndicator';
import { useNavigate } from "react-router-dom";
import * as ROUTE from "@/constants/routes";
import { Field, Form, Formik } from 'formik';

const RegisterRestaurant = () => {
  var navigate = useNavigate(); // react-router에서 사용하는 hook

  return (
    <div>
      <Navigation />
      <ProgressIndicator currentPage="restaurant" />
      <div className="mx-auto m-4 w-1/2 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">식당 등록</h3>
        <Formik
          initialValues={{
            name: "", // 식당 이름
            info: {
              address: "", // 주소
              openTime: "", // 오픈 시간
              closeTime: "", // 마감 시간
              phoneNumber: "", // 전화번호
              closedDay: "", // 휴무일
            },
            image: "", // 간판 이미지
          }}
          onSubmit={(values) => {
            var restaurantInfo = JSON.stringify(values, null, 2)
            // RegisterMenu 페이지로 이동
            navigate(ROUTE.RegisterMenu, { state: { restaurantInfo: restaurantInfo } });
          }}
        >
          {() => (
            <Form>
              <div className="text-center">
                <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="name">
                  식당 이름
                </label>
                <Field
                  name="name"
                  type="text"
                  label="식당 이름"
                  placeholder="맛있는 식당"
                  className="w-full border py-2 text-center"
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
              <div className="text-center">
                <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="phoneNumber">
                  전화번호
                </label>
                <Field
                  name="info.phoneNumber"
                  type="text"
                  label="전화번호"
                  placeholder="010-1234-5678"
                  className="w-full border py-2 text-center"
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
                <Field
                  name="image"
                  type="file"
                  label="간판 이미지"
                  className="w-full border py-2 text-center"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded bg-red-300 px-4 py-2 font-bold text-white hover:bg-red-500"
              >
                다음
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div></div>
    </div>
  );
};
export default RegisterRestaurant;