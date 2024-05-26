import { useEffect, useState } from "react";
import firebase from "@/services/firebase/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

const useAuth = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const dispatch = useDispatch(); // Redux dispatch

  const [isAuthLoading, setIsAuthLoading] = useState(false); // 로딩 여부
  const [error, setError] = useState(''); // 에러 여부

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await firebase.getUser(user.uid);
        dispatch(setUser(userData)); // Redux에 유저 정보 저장
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe(); // Clean up
  }, []);

  /**
   * 회원가입 폼 제출 시 호출되는 함수
   * @param {Object} values Formik에서 전달받은 값
   */
  const onFormSignUp = async (values) => {
    setIsAuthLoading(true);
    try {
      // 회원가입 요청
      const uid = await firebase.signUp(values);
      values.uid = uid;

      // 프로필 이미지 저장
      if (values.profileImage) {
        const profileImageUrl = await firebase.storeImage(values.profileImage, `users/${values.uid}/profile`);
        values.profileImage = profileImageUrl;
      }

      // firestore에 사용자 데이터 저장
      await firebase.addUser(values);

      alert("회원가입이 완료되었습니다.");
      navigate("/"); // 메인 페이지로 이동
    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError({ errorCode, errorMessage })
      alert("회원가입에 실패했습니다.\n 잠시후 다시 시도해주세요.")
    } finally {
      setIsAuthLoading(false);
    }
  };

  /**
   * 로그인 폼 제출 시 호출되는 함수
   */
  const onFormSignIn = async (values) => {
    setIsAuthLoading(true);
    
    try {
      const user = await firebase.signIn(values.email, values.password);
      if (user) {
        console.log('Firebase.signIn : ', user);
        navigate(-1); // 이전 페이지로 이동
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-credential') {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        alert("로그인에 실패했습니다.\n 잠시후 다시 시도해주세요.");
      }
    }
    setIsAuthLoading(false);
  };

  /**
   * 로그아웃 함수
   */
  const onSignOut = async () => {
    try {
      await firebase.signOut();
      
      // Redux store에서 user 정보 초기화
      dispatch(setUser({
        id: null,
        uid: null,
        address: null,
        profileImage: null,
        isOwner: false,
        phoneNumber: null,
        name: null,
        email: null,
      }));

      alert("로그아웃 되었습니다.");
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      console.error('Firebase.signOut: ', error);
      alert("로그아웃에 실패했습니다.\n 잠시후 다시 시도해주세요.");
    }
  };

  const profileUpdate = async (values) => {
    setIsAuthLoading(true);
    try {
      // 프로필 이미지 저장
      if (values.profileImage) {
        const profileImageUrl = await firebase.storeImage(values.profileImage, `users/${values.uid}/profile`);
        values.profileImage = profileImageUrl;
      }

      // 사용자 데이터 업데이트
      await firebase.updateUser(values);

      alert("프로필이 수정되었습니다.");
      navigate(-1); // 이전 페이지로 이동
    } catch (e) {
      return e;
    } finally {
      setIsAuthLoading(false);
    }
  };

  /**
   * 로그인한 유저 정보 가져오기
   * @returns 로그인한 유저 정보
   */
  const getUser = () => {
    const user = firebase.getCurrentUser(); // Firebase에서 로그인한 유저 정보 가져오기
    return user;
  };

  return {
    isAuthLoading,
    error,
    onFormSignUp,
    onFormSignIn,
    profileUpdate,
    getUser,
    onSignOut,
  };
}

export default useAuth;