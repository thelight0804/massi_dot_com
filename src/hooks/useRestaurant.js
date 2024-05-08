import firebase from "@/services/firebase"
import { useNavigate } from "react-router-dom";

const useRestaurant = () => {
  const navigate = useNavigate();

  const addToRestaurant = async (restaurantInfo, menuItems) => {
    restaurantInfo.menu = menuItems; // 메뉴 리스트 추가
    const id = await firebase.addRestaurant(restaurantInfo); // Firestore에 식당 데이터 추가

    // 식당 대표 이미지 저장
    const mainImageUrl = await firebase.storeImage(restaurantInfo.image, `restaurants/${id}/main/`);
    firebase.updateRestaurantMainImage(id, mainImageUrl); // Firestore에 이미지 URL 추가

    // 메뉴 이미지 저장
    // forEach는 비동기 처리가 안되므로 for문 사용
    for (let i = 0; i < restaurantInfo.menu.length; i++) {
      const item = restaurantInfo.menu[i];
      const menuImageUrl = await firebase.storeImage(item.image, `restaurants/${id}/menu/`);
      restaurantInfo.menu[i].image = menuImageUrl; // 이미지 URL 추가
    }
    await firebase.updateRestaurantMenuImage(id, restaurantInfo.menu); // Firestore에 메뉴 이미지 URL 추가

    // TODO: 로딩 추가
    if (id) {
      alert("식당 등록이 완료되었습니다.");
      navigate("/"); // 메인 페이지로 이동
    }
  }

  return { addToRestaurant };
};

export default useRestaurant;