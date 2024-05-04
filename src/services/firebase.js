import firebaseConfig from "./config"; // Firebase 설정 가져오기
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, limit, addDoc, updateDoc, doc } from "firebase/firestore"; // Firestore 데이터 받아오기
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app); // Initialize Firestore
    this.storage = getStorage(this.app); // Initialize Storage
  }

  // Firestore Funtions --------------

  /**
   * Firestore에서 여러 식당 데이터를 가져오는 함수
   * @param {Number} itemsCount 가져올 식당 데이터 개수
   * @returns {Array} restaurants 식당 데이터 배열
   */
  getRestaurants = async (itemsCount) => {
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
      console.error('Firebase.getRestaurant: ', e);
    }
    return restaurants; // 식당 데이터 배열 반환
  }

  addRestaurant = async (value) => {
    try {
      // Firestore에 식당 데이터 추가
      const docRef = await addDoc(collection(this.db, "restaurant"), value); // Firestore에 데이터 추가
      console.log("Document written with ID: ", docRef.id); // 등록된 식당 ID 출력

      // 식당 대표 이미지 저장
      // const snapshot = await this.storeImage(value.image, `restaurants/${docRef.id}/image.jpg`);
      // console.log('snapshot: ', snapshot)
      // const imageUrl = this.getFileURL(`restaurants/${docRef.id}/image.jpg`);
      // console.log('imageUrl: ', imageUrl)

      // 식당 이미지 경로 업데이트
      // const washingtonRef = doc(this.db, "restaurant", docRef.id);
      // console.log('imageUrl: ', imageUrl)
      // await updateDoc(washingtonRef, {
      //   image: imageUrl,
      // });

      return docRef.id; // 등록된 식당 ID 반환
    } catch (e) {
      console.error('Firebase.setRestaurant: ', e);
      alert("식당 등록에 실패했습니다.\n다시 시도해주세요.");
    }
  }

  // Storage Funtions --------------
  storeImage = async (file, path) => {
    // storage reference 생성
    const storageRef = ref(this.storage, path);
    try {
      // 파일 업로드
      return uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file: ", snapshot);
        return snapshot;
      })
    } catch (e) {
      console.error('Firebase.storeImage: ', e);
      alert("이미지 업로드에 실패했습니다.\n다시 시도해주세요.");
    }
  }

  getFileURL = (path) => {
    // storage reference 생성
    const storageRef = ref(this.storage, path);
    try {
      // 파일 다운로드 URL 반환
      getDownloadURL(storageRef)
        .then((url) => {
          return url;
        })
    } catch (e) {
      console.error('Firebase.getFileURL: ', e);
      alert("이미지 다운로드에 실패했습니다.\n다시 시도해주세요.");
    }
  }

}


const firebaseInstance = new Firebase(); // Firebase 생성자
export default firebaseInstance; // Firebase 인스턴스 내보내기