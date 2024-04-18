import firebaseConfig from "./config"; // Firebase 설정 가져오기
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, limit } from "firebase/firestore"; // Firestore 데이터 받아오기

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app); // Initialize Firestore
  }

  // Firestore Funtions --------------

  /**
   * Firestore에서 여러 식당 데이터를 가져오는 함수
   */
  async getRestaurants(itemsCount) {
    const restaurants = []; // 식당 데이터 배열
    try {
      const q = query(collection(this.db, "restaurant"), limit(itemsCount)); // 데이터 가져오는 쿼리
      const querySnapshot = await getDocs(q); // 쿼리 실행
      querySnapshot.forEach((doc) => {
        // 식당 데이터 배열에 추가
        restaurants.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (e) {
      console.error('Firebase.getRestaurant : ', e);
    }
    return restaurants; // 식당 데이터 배열 반환
  }
}

const firebaseInstance = new Firebase(); // Firebase 생성자
export default firebaseInstance; // Firebase 인스턴스 내보내기