import db from './firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

// Firebase Firestore 읽기
const querySnapshot = await getDocs(collection(db, "restaurant"));
querySnapshot.forEach((doc) => {
//setState(doc.data().reviews);
});

fetchData();