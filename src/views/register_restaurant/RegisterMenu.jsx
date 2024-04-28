import React from 'react';
import Navigation from '@/components/common/Navigation';
import { Field, Form, Formik } from 'formik';
import { useNavigate, useLocation } from "react-router-dom";
import ProgressIndicator from '@/components/common/ProgressIndicator';

const RegisterMenu = () => {
  var navigate = useNavigate();
  const location = useLocation();
  var restaurantInfo = location.state.restaurantInfo; // RegisterRestaurant 페이지에서 전달받은 데이터

  return (
    <div>
      <Navigation />
      <ProgressIndicator currentPage="menu" />
      <div className="mx-auto m-4 w-1/2 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">메뉴 등록</h3>
        <Formik
          initialValues={{
            menu: [ // TODO: 배열을 동적으로 추가할 수 있도록 수정
              {
                name: "", // 메뉴 이름
                price: 0, // 가격
              },
            ],
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {() => (
            <Form>
              <div className="text-center">
                <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="name">
                  메뉴 이름
                </label>
                <Field
                  name="menu[0].name"
                  type="text"
                  label="메뉴 이름"
                  placeholder="음식명"
                  className="w-full border py-2 text-center"
                />
              </div>
              <div className="text-center">
                <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="address">
                  가격
                </label>
                <Field
                  name="menu[0].price"
                  type="number"
                  label="가격"
                  placeholder="5000"
                  className="w-full border py-2 text-center"
                />
              </div>
              <div className='flex space-x-4'>
                <button
                  type="button"
                  className="mt-4 w-full rounded bg-gray-300 px-4 py-2 font-bold text-white hover:bg-gray-500"
                  onClick={() => {
                    navigate(-1); // 이전 페이지로 이동
                  }}
                >
                  이전
                </button>
                <button
                  type="submit"
                  className="mt-4 w-full rounded bg-red-300 px-4 py-2 font-bold text-white hover:bg-red-500"
                >
                  등록
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div></div>
    </div>
  );
};
export default RegisterMenu;