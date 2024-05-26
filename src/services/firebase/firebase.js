import firebaseConfig from "./config"; // Firebase 설정 가져오기
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, getDoc, getFirestore, query, limit, addDoc, updateDoc, doc, where, getDocFromCache } from "firebase/firestore"; // Firestore 데이터 받아오기
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app); // Initialize Firestore
    this.storage = getStorage(this.app); // Initialize Storage
    this.auth = getAuth(this.app); // Initialize Auth
    setPersistence(this.auth, browserLocalPersistence) // 로그인 정보를 LocalStorage에 저장
  }

  // Auth Actions --------------

  /**
   * Firebase Auth에서 회원가입하는 함수
   * @param {Object} values 회원가입 폼 데이터
   * @returns {Promise} userCredential 유저 정보
   */
  signUp = async (values) =>
    await createUserWithEmailAndPassword(this.auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('firebase.signUp : ', user);

        // Firestore에 사용자 데이터 추가
        this.addUser(user.uid, values);

        return user;
      })
      .catch((error) => {
        return error;
      });

  /**
   * Firebase Auth에서 로그인하는 함수
   * @param {String} email 
   * @param {String} password 
   * @returns {Promise} userCredential
   */
  signIn = async (email, password) => 
    signInWithEmailAndPassword(this.auth, email, password)

  /**
   * Firebase Auth에서 로그아웃하는 함수
   * @returns signOut 함수 실행 결과
   */
  signOut = async () => {
    try {
      await signOut(this.auth);
    } catch (error) {
      return error;
    }
  }

  /**
   * Firestore에 유저 데이터를 추가하는 함수
   * @param {String} uid 유저 고유 ID
   * @param {Object} values 유저 데이터
   * @returns 
   */
  addUser = async (uid, values) => {
    try {
      const docRef = await addDoc(collection(this.db, "users"), {
        uid: uid,
        email: values.email,
        name: values.name,
        phoneNumber: values.phoneNumber,
        address: values.address,
        profileImage: null, // 프로필 이미지 URL은 null로 초기화
        isOwner: values.isOwner,
      });
      console.log("Document user written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error('Firebase.addUser: ', e);
    }
  }

  /**
   * Firestore에서 유저 데이터를 가져오는 함수
   * @param {String} uid 유저 고유 ID
   * @returns {Object} userData 유저 데이터
   */
  getUser = async (uid) => {
    const usersRef = collection(this.db, "users");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let userData = {};
    querySnapshot.forEach((doc) => {
      userData = {
        id: doc.id,
        ...doc.data(),
      };
    });
    return userData;
  }

  /**
   * Firebase에 로그인한 유저 정보를 가져오는 함수
   * @returns 로그인 한 유저 정보
   */
  getCurrentUser = () => {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        return user;
      } else {
        return null;
      }
    }
    );
  };

  // Restaurant Actions --------------

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

  /**
   * Firestore에 식당 데이터를 추가하는 함수
   * @param {Object} value 식당 데이터
   * @returns {String} docRef.id 등록된 식당 ID
   */
  addRestaurant = async (value) => {
    try {
      // 메뉴 데이터에 이미지 제거
      var menu = value.menu.map(item => ({ ...item, image: null }));
      console.log('value.uid: ', value.uid);

      // Firestore에 식당 데이터 추가
      const docRef = await addDoc(collection(this.db, "restaurant"), {
        name: value.name,
        info: value.info,
        mainMenu: value.mainMenu,
        image: null, // 이미지 URL은 null로 초기화
        menu: menu, // 이미지를 제거한 메뉴 데이터 추가
        uid: value.uid, // 사용자 ID 추가
      });
      console.log("Document restaurant written with ID: ", docRef.id); // 등록된 식당 ID 출력
      return docRef.id; // 등록된 식당 ID 반환
    } catch (e) {
      console.error('Firebase.setRestaurant: ', e);
      alert("식당 등록에 실패했습니다.\n다시 시도해주세요.");
    }
  }

  /**
   * Firestore에서 식당 데이터를 가져오는 함수
   * @param {String} id 식당 문서 ID
   * @returns {Object} 식당 데이터
   */
  getRestaurant = async (id) => {
    const restaurantRef = doc(this.db, "restaurant", id);
    const docSnap = await getDoc(restaurantRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  };

  /**
   * Firestore에 식당 대표 이미지 URL을 업데이트하는 함수
   * @param {String} id 식당 ID
   * @param {String} imageUrl 이미지 URL
   */
  updateRestaurantMainImage = async (id, imageUrl) => {
    try {
      const washingtonRef = doc(this.db, "restaurant", id);
      await updateDoc(washingtonRef, {
        image: imageUrl,
      });
    } catch (e) {
      console.error('Firebase.updateRestaurantMainImage: ', e);
      alert("간판 이미지 업로드에 실패했습니다.\n다시 시도해주세요.");
    }
  }

  /**
   * Firestore에 식당 메뉴 이미지들을 업데이트하는 함수
   * @param {String} id 식당 ID
   * @param {Array} value 메뉴 데이터 배열
   */
  updateRestaurantMenuImage = async (id, value) => {
    try {
      const washingtonRef = doc(this.db, "restaurant", id);
      await updateDoc(washingtonRef, {
        menu: [...value],
      });
    } catch (e) {
      console.error('Firebase.updateRestaurantMenuImage: ', e);
      alert("메뉴 이미지 업로드에 실패했습니다.\n다시 시도해주세요.");
    }
  }

  // Review Actions --------------

  /**
   * Firestore에 리뷰 데이터를 추가하는 함수
   * @param {Object} value 리뷰 데이터
   * @returns {String} docRef.id 등록된 식당 ID
   */
  addReview = async (value) => {
    try {
      // 식당 데이터 검색
      const washingtonRef = doc(this.db, "restaurant", value.restaurantId);
      const docSnap = await getDoc(washingtonRef);

      if (docSnap.exists()) {
        const restaurant = docSnap.data();
        // 리뷰 데이터 추가
        const reviews = restaurant.reviews ? [...restaurant.reviews, value] : [value];
        // Firestore에 리뷰 데이터 갱신(추가)
        await updateDoc(washingtonRef, {
          reviews: reviews,
        });
      } else {
        console.log("No such document!");
      }
      console.log("Document review written with ID: ", washingtonRef.id); // 등록된 식당 ID 출력
    } catch (e) {
      console.error('Firebase.setRestaurant: ', e);
      alert("식당 등록에 실패했습니다.\n다시 시도해주세요.");
    }
  }

  deleteReview = async (restaurantId, reviewIndex) => {
    try {
      // 식당 데이터 검색
      const washingtonRef = doc(this.db, "restaurant", restaurantId);
      const docSnap = await getDoc(washingtonRef);

      if (docSnap.exists()) {
        const restaurant = docSnap.data();
        const reviews = restaurant.reviews ? [...restaurant.reviews] : [];
        reviews.splice(reviewIndex, 1); // 해당 인덱스의 리뷰 삭제

        // Firestore에 리뷰 데이터 갱신(삭제)
        await updateDoc(washingtonRef, {
          reviews: reviews,
        });
        console.log("Document review written with ID: ", washingtonRef.id); // 등록된 식당 ID 출력
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error('Firebase.deleteReview: ', e);
      return e;
    }
  }

  addReply = async (content, restaurantId, reviewIndex) => {
    try {
      // Firestore에 리뷰 데이터 갱신(추가)
      const washingtonRef = doc(this.db, "restaurant", restaurantId);
      const docSnap = await getDoc(washingtonRef);

      if (docSnap.exists()) {
        const restaurant = docSnap.data();
        const reviews = restaurant.reviews ? [...restaurant.reviews] : [];
        reviews[reviewIndex].reply = content;
        await updateDoc(washingtonRef, {
          reviews: reviews,
        });
        console.log("Document reply written with ID: ", washingtonRef.id); // 등록된 식당 ID 출력
        alert("답글이 등록되었습니다.");
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error('Firebase.addReply: ', e);
      alert("답글 등록에 실패했습니다.\n다시 시도해주세요.");
      return e;
    }
  }

  // Storage Actions --------------

  /**
   * 파일을 Storage에 업로드하는 함수
   * @param {File} file 파일 객체
   * @param {String} path 파일 저장 경로
   * @returns {String} 파일 경로 URL
   */
  storeImage = async (file, path) => {
    // 임의의 파일명 생성
    const filename = 'file_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

    // storage reference 생성
    const storageRef = ref(this.storage, path + filename);

    try {
      // 파일 업로드
      return uploadBytesResumable(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file: ", storageRef);
        return getDownloadURL(storageRef);
      })
    } catch (e) {
      console.error('Firebase.storeImage: ', e);
      alert("이미지 업로드에 실패했습니다.\n다시 시도해주세요.");
    }
  }
}

const firebaseInstance = new Firebase(); // Firebase 생성자
export default firebaseInstance; // Firebase 인스턴스 내보내기