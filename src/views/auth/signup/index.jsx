import Navigation from '@/components/common/Navigation';
import { Field, Form, Formik } from 'formik';
import { useAuth } from '@/hooks';

const SignUp = () => {
  //TODO: 식당 관계자인지, 일반 사용자인지 선택하는 radio 버튼 추가, 프로필 이미지 추가
  const {
    onFormSubmit,
    isLoding,
    error
  } = useAuth();

  return (
    <div>
      <Navigation />
      <div className="m-4 mx-auto w-1/2 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">회원가입</h3>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            onFormSubmit(values);
          }}
        >
          {() => (
            <Form className="justify-evenly md:flex">
              <div>
                <div className="text-center">
                  <label
                    className="block pb-2 pt-4 text-sm font-bold"
                    htmlFor="name"
                  >
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
                    placeholder="6자리 이상 입력해주세요"
                    className="w-full border py-2 text-center"
                    pattern=".{6,}"
                    required
                  />
                </div>
              </div>
              <div className="mx-2 w-0.5 bg-gray-100" />
              <div className="md:relative md:w-1/3">
                <div className="flex space-x-4 md:absolute md:inset-x-0 md:bottom-0 md:block md:space-x-0">
                  <button type="submit" className="btn-secondary">
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