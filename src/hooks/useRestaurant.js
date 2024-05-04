import firebase from "@/services/firebase"

const useRestaurant = () => {
  const addToRestaurant = async (restaurantInfo, menuItems) => {
    restaurantInfo = JSON.parse(restaurantInfo); // JSON 문자열을 JSON 객체로 변환
    restaurantInfo.menu = menuItems; // 메뉴 리스트 추가
    const id = await firebase.addRestaurant(restaurantInfo); // Firestore에 식당 데이터 추가

    // 식당 대표 이미지 저장
    const snapshot = await firebase.storeImage(restaurantInfo.image, `restaurants/${id}/image.jpg`);
    console.log('snapshot:', snapshot);
    //TODO: 식당 이미지 경로 업데이트
  }

  return { addToRestaurant };
};

export default useRestaurant;