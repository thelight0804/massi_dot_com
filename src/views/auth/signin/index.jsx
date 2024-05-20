import * as ROUTE from "@/constants/routes";
import { NavLink } from "react-router-dom";
import { Field, Form, Formik } from 'formik';
import { useAuth } from '@/hooks';
import ScreenLoader from '@/components/common/ScreenLoader';

const SignIn = () => {
  const {
    onFormSignIn,
    isLoading,
  } = useAuth();

  return (
    <div>
      {isLoading && <ScreenLoader />}
      <div className="m-4 mx-auto mb-0 w-1/2 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">로그인</h3>
        <Formik
          initialValues={{
            email: "", // 이메일
            password: "", // 비밀번호
          }}
          onSubmit={(values, {resetForm}) => {
            onFormSignIn(values);
            resetForm(); // Form 초기화
          }}
        >
          {() => (
            <Form className="block md:flex md:justify-evenly">
              <div>
                <div className="text-center">
                  <label
                    className="block pb-2 pt-4 text-sm font-bold"
                    htmlFor="email"
                  >
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
                  <label
                    className="block pb-2 pt-4 text-sm font-bold"
                    htmlFor="password"
                  >
                    비밀번호
                  </label>
                  <Field
                    name="password"
                    type="password"
                    label="비밀번호"
                    placeholder="비밀번호"
                    className="w-full border py-2 text-center"
                    required
                  />
                </div>
              </div>
              <div className="w-0.5 bg-gray-100 md:mx-2" />
              <div className="md:relative md:w-1/3">
                <div className="flex space-x-4 md:absolute md:inset-x-0 md:bottom-0 md:block md:space-x-0">
                  <button type="submit" className="btn-secondary w-full mt-4">
                    로그인
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="mx-auto w-1/2 border bg-gray-100 p-4 text-center">
        <div className="flex justify-center items-center">
          <p className="text-xs font-bold text-gray-700 mr-8">계정이 없으신가요?</p>
          <NavLink
            className="btn-gray w-fit"
            to={ROUTE.SignUp}>회원가입</NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignIn;