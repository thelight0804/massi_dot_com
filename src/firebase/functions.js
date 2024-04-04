import db from '@/firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore"; // Firestore 데이터 받아오기

/**
 * Firestore 데이터 받아오기
 */
const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "restaurant"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
};