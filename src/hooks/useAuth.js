import { useState } from "react";
import firebase from "@/services/firebase"
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부
  const [error, setError] = useState(''); // 에러 여부

  /**
   * 회원가입 폼 제출 시 호출되는 함수
   * @param {Object} values Formik에서 전달받은 값
   */
  const onFormSignUp = async (values) => {
    setIsLoading(true); // 로딩 시작

    try {
      const user = await firebase.signUp(values);
      if (user) {
        alert("회원가입이 완료되었습니다.");
        navigate("/"); // 메인 페이지로 이동
      }
    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError({ errorCode, errorMessage })
      alert("회원가입에 실패했습니다.\n 잠시후 다시 시도해주세요.")
    }
    setIsLoading(false);
  };

  const onFormSignIn = async (values) => {
    setIsLoading(true);

    try {
      const user = await firebase.signIn(values.email, values.password);
      if (user) {
        navigate("/"); // 메인 페이지로 이동
      }
    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-credential')
        alert("아이디 또는 비밀번호가 일치하지 않습니다.")
      else if (errorCode === 'auth/user-not-found')
        alert("존재하지 않는 사용자입니다.")
      else
        alert("로그인에 실패했습니다.\n 잠시후 다시 시도해주세요.")
    }
    setIsLoading(false);
  };

  return {
    onFormSignUp, onFormSignIn, isLoading, error
  };
}

export default useAuth;