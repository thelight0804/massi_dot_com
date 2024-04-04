import db from '@/firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

useEffect(() => {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "restaurant"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  fetchData();
}, []);

fetchData();