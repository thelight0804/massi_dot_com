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
  const onFormSubmit = async (values) => {
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

  return {
    onFormSubmit, isLoading, error
  };
}

export default useAuth;