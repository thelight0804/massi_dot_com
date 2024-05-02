const useRestaurant = () => {
  const addToRestaurant = (restaurantInfo, menuItems) => {
    restaurantInfo = JSON.parse(restaurantInfo); // JSON 문자열을 JSON 객체로 변환
    restaurantInfo.menu = menuItems; // 메뉴 리스트 추가
    // TODO: 식당 등록
  }

  return { addToRestaurant };
};

export default useRestaurant;