import { Field, Form, Formik } from 'formik';
import { useAuth } from '@/hooks';
import ScreenLoader from '@/components/common/ScreenLoader';
import { useEffect } from 'react';

const SignUp = () => {
  const { onFormSignUp, isAuthLoading: isLoading } = useAuth();
  
  useEffect(() => {
    alert("현재 Firebase 쓰기 권한이 막혀있어, 회원가입 기능을 사용할 수 없습니다. 사용하기 위해서는 thelight0804@gmail.com으로 문의해주세요.\nSignup is currently disabled due to Firebase write permission restrictions. Please contact 'thelight0804@gmail.com'")
  }, [])

  return (
    <div className="m-4 mx-auto md:w-4/5">
      {isLoading && <ScreenLoader />}
      <div className="m-4 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">회원가입</h3>
        <Formik
          initialValues={{
            name: "", // 이름
            email: "", // 이메일
            password: "", // 비밀번호
            phoneNumber: "", // 전화번호
            address: "", // 주소
            isOwner: false, // 식당 관계자 여부
            profileImage: null, // 프로필 이미지
          }}
          onSubmit={(values) => {
            alert("현재 Firebase 쓰기 권한이 막혀있어, 회원가입 기능을 사용할 수 없습니다. thelight0804@gmail.com으로 문의해주세요.\nSignup is currently disabled due to Firebase write permission restrictions. Please contact 'thelight0804@gmail.com'")
            // onFormSignUp(values); // FIX: 회원가입 비활성화
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
                    placeholder="맛있닷컴" // 힌트
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
                    placeholder="test@example.com"
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
                    placeholder="6자리 이상 입력해주세요"
                    className="w-full border py-2 text-center"
                    pattern=".{6,}"
                    required
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="phoneNumber" >
                    전화번호
                  </label>
                  <Field
                    name="phoneNumber"
                    type="tel"
                    label="전화번호"
                    placeholder="010-1234-5678"
                    className="w-full border py-2 text-center"
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    required
                  />
                </div>
              </div>
              <div className="w-0.5 md:mx-2 bg-gray-100" />
              <div className="md:w-1/3 md:relative">
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="address">
                    주소
                  </label>
                  <Field
                    name="address"
                    type="text"
                    label="주소"
                    placeholder="서울시 강남구 역삼동"
                    className="w-full border py-2 text-center"
                    required
                  />
                </div>
                <div className="text-center">
                  <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="isOwner">
                    식당 관계자
                  </label>
                  <div className="flex justify-evenly border-2 border-gray-100 py-2">
                    <p className='text-right text-sm'>사장님이면 체크해 주세요</p>
                    <Field
                      name="isOwner"
                      type="checkbox"
                      className="border py-2 text-center"
                    />
                  </div>
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
                <div className="flex space-x-4 md:inset-x-0 md:bottom-0 md:block md:space-x-0">
                  <button type="submit" className="btn-secondary w-full mt-4">
                    회원가입
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

export default SignUp;