import react, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { Field, Form, Formik } from 'formik';
import ScreenLoader from '@/components/common/ScreenLoader';
import useRestaurant from '@/hooks/useRestaurant';


const WriteReview = () => {
  const user = useSelector((state) => state.user); // Redux store에서 user 정보 가져오기
  var navigate = useNavigate(); // 이전 페이지로 이동하기 위해 사용
  var { id } = useParams(); // 식당 고유 ID (URL 파라미터 값)
  const { getRestaurant } = useRestaurant(); // useRestaurant 훅 사용
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState([]); // 메뉴 리스트 초기화
  const [menus, setMenus] = useState([1]); // 메뉴 리스트 초기화

  useEffect(() => {
    // if (!user.uid) {
    //   alert('비정상적인 접근입니다. 이전 페이지로 이동합니다.');
    //   navigate(-1); // 이전 페이지로 이동
    // }
  }, [user]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setIsLoading(true);
      const restaurant = await getRestaurant(id);
      if (restaurant) {
        setMenus(...restaurant.menu);
      } else {
        alert("식당 정보를 가져오는데 실패했습니다.");
        navigate(-1); // 메인 페이지로 이동
      }
      setIsLoading(false);
    }
    fetchRestaurant();
  }, []);

  return (
    <div>
      {isLoading && <ScreenLoader />}
      <div className="mx-auto m-4 w-1/2 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">리뷰 등록</h3>
        <Formik
          initialValues={{
            eatenMenu: '',
            data: '',
            rating: 0,
            content: '',
            image: null,
            profileImage: user.profileImage,
            userName: user.name,
          }}
          onSubmit={(values) => {
            alert('리뷰 등록 성공');
          }}
        >
          {({setFieldValue}) => (
            <Form className="md:flex justify-evenly">
              <div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="eatenMenu">
                    어떤 음식을 먹었나요?
                  </label>
                  <Field
                    name="eatenMenu"
                    type="text"
                    label="메뉴 이름"
                    placeholder="음식명" // TODO: 음식명 설정
                    required
                    className="w-full border py-2 text-center"
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="data">
                    언제 방문했나요?
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
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="rating">
                    별점을 선택해주세요.
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
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="content">
                    리뷰를 작성해주세요.
                  </label>
                  <Field
                    name="eatenMenu"
                    type="text"
                    label="메뉴 이름"
                    placeholder="음식명"
                    required
                    className="w-full border py-2 text-center"
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="image">
                    음식 사진을 등록해주세요.
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
              </div>
              <div className="bg-gray-100 w-0.5 mx-2" />
              <div className='md:w-1/3 md:relative'>
                <div className='block md:space-x-0 md:absolute md:inset-x-0 md:bottom-0'>
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