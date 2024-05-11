import { useEffect, useState } from "react";
import firebase from "@/services/firebase"

/**
 * Firestore에서 식당 데이터를 가져오는 훅
 * @returns {Object} restaurants, fetchRestaurants, isLoading, error
 */
const useRestaurants = (itemsCount) => {
  const [restaurants, setRestaurants] = useState([]); // 식당 state
  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [error, setError] = useState(''); // 에러 여부

  /**
   * Firestore에서 식당 데이터를 가져오는 함수
   * @param {number} itemsCount - 가져올 식당 데이터 개수
   * @returns {array} 식당 데이터
   */
  const fetchRestaurants = async (itemsCount) => {
    try {
      setError(''); // 에러 초기화
      const docs = await firebase.getRestaurants(itemsCount); // Firestore에서 식당 데이터 가져오기

      if (docs.empty) { // 데이터가 없을 경우
        setError('식당 데이터가 없습니다.');
        console.error(error);
        setIsLoading(false);
      } else { // 데이터가 있을 경우
        setRestaurants(docs); // 식당 데이터 state에 저장
      }
    } catch (e) { // 에러 발생 시
      setError('식당 데이터를 불러오는데 실패했습니다.');
      console.error(error);
    }
    setIsLoading(false); // 로딩 종료
  };

  // 컴포넌트가 마운트 되었을 때 실행
  useEffect(() => {
    fetchRestaurants(itemsCount);
  }, []);

  return { 
    restaurants, fetchRestaurants, isLoading, error
  };
};

export default useRestaurants;