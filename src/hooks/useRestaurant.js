import { useState } from "react";
import firebase from "@/services/firebase/firebase"
import { useNavigate } from "react-router-dom";

const useRestaurant = () => {
  const navigate = useNavigate();

  const [isRestaurantLoading, setIsRestaurantLoading] = useState(false); // 로딩 여부
  const [error, setError] = useState(''); // 에러 여부

  /**
   * Firestore에 식당 데이터 추가
   * @param {Object} restaurantInfo 등록할 식당 정보
   * @param {Object} menuItems 등록할 메뉴 리스트
   */
  const addToRestaurant = async (restaurantInfo, menuItems) => {
    setIsRestaurantLoading(true); // 로딩 시작
    try{
      restaurantInfo.menu = menuItems; // 메뉴 리스트 추가
      const id = await firebase.addRestaurant(restaurantInfo); // Firestore에 식당 데이터 추가

      // 식당 대표 이미지 저장
      const mainImageUrl = await firebase.storeImage(restaurantInfo.image, `restaurants/${id}/main/`);
      firebase.updateRestaurantMainImage(id, mainImageUrl); // Firestore에 이미지 URL 추가
      restaurantInfo.image = mainImageUrl; // 이미지 URL 추가

      // 메뉴 이미지 저장
      // forEach는 비동기 처리가 안되므로 for문 사용
      for (let i = 0; i < restaurantInfo.menu.length; i++) {
        const item = restaurantInfo.menu[i];
        const menuImageUrl = await firebase.storeImage(item.image, `restaurants/${id}/menu/`);
        restaurantInfo.menu[i].image = menuImageUrl; // 이미지 URL 추가
      }
      await firebase.updateRestaurantMenuImage(id, restaurantInfo.menu); // Firestore에 메뉴 이미지 URL 추가

      if (id) {
        setIsRestaurantLoading(false);
        alert("식당 등록이 완료되었습니다.");
        navigate("/"); // 메인 페이지로 이동
      }
    } catch (e) {
      setIsRestaurantLoading(false);
      setError('식당 데이터를 추가하는데 실패했습니다.');
    }
    setIsRestaurantLoading(false);
  }
  
  /**
   * Firestore에서 식당 데이터 가져오기
   * @param {String} id 식당 문서 ID
   * @returns {Object} 식당 데이터
   */
  const getRestaurant = async (id) => {
    setIsRestaurantLoading(true);
    const restaurant = await firebase.getRestaurant(id);
    setIsRestaurantLoading(false);
    return restaurant;
  }

  return {
    isRestaurantLoading, error, addToRestaurant, getRestaurant
  };
};

export default useRestaurant;