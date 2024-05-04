import firebase from "@/services/firebase"

const useRestaurant = () => {
  const addToRestaurant = async (restaurantInfo, menuItems) => {
    restaurantInfo = JSON.parse(restaurantInfo); // JSON 문자열을 JSON 객체로 변환
    restaurantInfo.menu = menuItems; // 메뉴 리스트 추가
    await firebase.addRestaurant(restaurantInfo); // Firestore에 식당 데이터 추가
  }

  return { addToRestaurant };
};

export default useRestaurant;