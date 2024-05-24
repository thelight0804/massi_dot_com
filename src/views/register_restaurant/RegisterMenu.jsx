import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Field, Form, Formik } from 'formik';
import { useRestaurant } from '@/hooks';
import ProgressIndicator from '@/components/common/ProgressIndicator';
import ScreenLoader from '@/components/common/ScreenLoader';

const RegisterMenu = () => {
  const user = useSelector((state) => state.user); // Redux store에서 user 정보 가져오기
  var navigate = useNavigate(); // 이전 페이지로 이동하기 위해 사용
  const location = useLocation(); // RegisterRestaurant 페이지에서 전달받은 데이터를 사용하기 위해 사용
  const { addToRestaurant, isLoading, error } = useRestaurant(); // useRestaurant 훅 사용

  var restaurantInfo = location.state.restaurantInfo; // RegisterRestaurant 페이지에서 전달받은 데이터
  const [menuItems, setMenuItems] = useState([]); // 메뉴 리스트 초기화

  useEffect(() => {
    if (!user.uid) {
      alert('비정상적인 접근입니다. 이전 페이지로 이동합니다.');
      navigate(-1); // 이전 페이지로 이동
    }
  }, [user]);

  /**
   * 식당 최종 등록 헨들러
   * @param {Array} menuItems 추가된 메뉴 리스트
   */
  const handleAddRestarant = (menuItems) => {
    // 메뉴가 추가되지 않았을 때 확인 메시지
    if (menuItems.length === 0 && !window.confirm('메뉴가 추가되지 않았습니다. 그래도 등록하시겠습니까?')) {
      return;
    }
    addToRestaurant(restaurantInfo, menuItems); // 식당 등록 함수 호출
  };

  return (
    <div>
      {isLoading && <ScreenLoader />}
      <ProgressIndicator currentPage="menu" />
      <div className="mx-auto m-4 w-1/2 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">메뉴 등록</h3>
        <Formik
          initialValues={{ name: '', price: 0 }}
          onSubmit={(values, {resetForm}) => {
            setMenuItems([...menuItems, values]); // 메뉴 추가
            alert('메뉴가 추가되었습니다.');
            resetForm(); // Form 초기화
          }}
        >
          {({setFieldValue}) => (
            <Form className="md:flex justify-evenly">
              <div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="name">
                    메뉴 이름
                  </label>
                  <Field
                    name="name"
                    type="text"
                    label="메뉴 이름"
                    placeholder="음식명"
                    required
                    className="w-full border py-2 text-center"
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="address">
                    가격
                  </label>
                  <Field
                    name="price"
                    type="number"
                    label="가격"
                    placeholder="5000"
                    min={1} // 최소값
                    required
                    className="w-full border py-2 text-center"
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="image">
                    메뉴 이미지
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    label="메뉴 이미지"
                    className="w-full border py-2 text-center"
                    required
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-orange w-full mt-4"
                >
                  메뉴 추가
                </button>
              </div>
              <div className="bg-gray-100 w-0.5 mx-2" />
              <div className='md:w-1/3 md:relative'>
                <div className='flex space-x-4 md:block md:space-x-0 md:absolute md:inset-x-0 md:bottom-0'>
                  <button
                    type="button"
                    className="btn-gray w-full mt-4"
                    onClick={() => {
                      navigate(-1); // 이전 페이지로 이동
                    }}
                  >
                    이전
                  </button>
                  <button
                    type="button"
                    className="btn-secondary w-full mt-4"
                    onClick={() => handleAddRestarant(menuItems)}
                  >
                    등록
                  </button>
                </div>
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