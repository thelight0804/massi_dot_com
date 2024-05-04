import firebaseConfig from "./config"; // Firebase 설정 가져오기
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, limit, addDoc } from "firebase/firestore"; // Firestore 데이터 받아오기

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app); // Initialize Firestore
  }

  // Firestore Funtions --------------

  /**
   * Firestore에서 여러 식당 데이터를 가져오는 함수
   * @param {Number} itemsCount 가져올 식당 데이터 개수
   * @returns {Array} restaurants 식당 데이터 배열
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

  async addRestaurant(value) {
    try {
      const docRef = await addDoc(collection(this.db, "restaurant"), value); // Firestore에 데이터 추가
      console.log("Document written with ID: ", docRef.id); // 등록된 식당 ID 출력
      alert("식당이 등록되었습니다.");
      // TODO: 대표 메뉴, 대표 이미지 등록
    } catch (e) {
      console.error('Firebase.setRestaurant : ', e);
      alert("식당 등록에 실패했습니다.\n다시 시도해주세요.");
    }
  }
}

const firebaseInstance = new Firebase(); // Firebase 생성자
export default firebaseInstance; // Firebase 인스턴스 내보내기