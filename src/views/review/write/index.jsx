import react, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from 'formik';
import ScreenLoader from '@/components/common/ScreenLoader';
import useRestaurant from '@/hooks/useRestaurant';
import useReview from '@/hooks/useReview';


const WriteReview = () => {
  const user = useSelector((state) => state.user); // Redux store에서 user 정보 가져오기
  var navigate = useNavigate(); // 이전 페이지로 이동하기 위해 사용
  var { id } = useParams(); // 식당 고유 ID (URL 파라미터 값)
  const { getRestaurant, isRestaurantLoading } = useRestaurant(); // useRestaurant 훅 사용
  const { addReview, isReviewLoading } = useReview(); // useReview 훅 사용
  const [menus, setMenus] = useState([]); // 식당 메뉴

  useEffect(() => {
    if (!user.uid) {
      alert('비정상적인 접근입니다. 이전 페이지로 이동합니다.');
      navigate(-1); // 이전 페이지로 이동
    }
  }, [user]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurant(id);
      if (restaurant) {
        setMenus(restaurant.menu);
      } else {
        alert("식당 정보를 가져오는데 실패했습니다.");
        navigate(-1); // 메인 페이지로 이동
      }
    }
    fetchRestaurant();
  }, []);
  return (
    <div className="m-4 mx-auto md:w-4/5">
      {(isRestaurantLoading || isReviewLoading) && <ScreenLoader />}
      <div className="m-4 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">리뷰 등록</h3>
        <Formik
          initialValues={{
            eatenMenu: '',
            date: '',
            rating: 0,
            content: '',
            image: null,
          }}
          onSubmit={(values) => {
            if (values.eatenMenu.length === 0) values.eatenMenu = menus[0].name; // 메뉴 선택하지 않았을 때 기본값 설정
            values.profileImage = user.profileImage; // 사용자 프로필 이미지 추가
            values.userName = user.name; // 사용자 이름 추가
            values.restaurantId = id; // 식당 고유 ID 추가
            values.uid = user.uid; // 사용자 고유 ID 추가
            addReview(values); // 리뷰 등록
          }}
        >
          {({ setFieldValue }) => (
            <Form className="md:flex justify-evenly">
              <div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="eatenMenu">
                    어떤 음식을 먹었나요?
                  </label>
                  <Field
                    name="eatenMenu"
                    as="select"
                    label="메뉴 이름"
                    // required
                    className="w-full border py-2 text-center"
                  >
                    {menus.map((menu, index) => (
                      <option key={index} value={menu.name}>
                        {menu.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="date">
                    언제 방문했나요?
                  </label>
                  <input
                    name="date"
                    type="date"
                    label="날짜"
                    max={new Date().toISOString().split('T')[0]} // 현재 날짜
                    min={'1999-01-01'}
                    className="w-full border py-2 text-center"
                    required
                    onChange={(event) => {
                      setFieldValue('date', event.currentTarget.value);
                    }}
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="rating">
                    이 가게에 별점은 몇 점인가요?
                  </label>
                  <Field
                    name="rating"
                    type="number"
                    label="별점"
                    min={1} // 최소값
                    max={5} // 최대값
                    className="w-full border py-2 text-center"
                  />
                </div>
              </div>
              <div className="bg-gray-100 w-0.5 mx-2" />
              <div className='md:w-1/3 md:relative'>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="content">
                    가게에 대한 리뷰를 작성해주세요.
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    rows="4"
                    cols="50"
                    label="리뷰"
                    placeholder="맛, 서비스, 가게 분위기 등에 대한 리뷰를 작성해주세요"
                    className="w-full border py-2 text-left"
                    onChange={(event) => {
                      setFieldValue('content', event.currentTarget.value);
                    }}
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="image">
                    가게에서 찍은 사진이 있나요?
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    label="메뉴 이미지"
                    className="w-full border py-2 text-center"
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
                  />
                </div>
                <div className='block'>
                  <button
                    type="button"
                    className="btn-gray w-full mt-4"
                    onClick={() => { navigate(-1) }} // 이전 페이지로 이동
                  >
                    이전
                  </button>
                  <button type="submit" className="btn-orange w-full mt-4" >
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


export default WriteReview;