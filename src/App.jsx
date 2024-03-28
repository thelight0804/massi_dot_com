import React, { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

import db from './firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "restaurant"));
      querySnapshot.forEach((doc) => {
        setReviews(doc.data().reviews);
      });
    };

    fetchData();
  }, []);

  console.log(reviews[0], reviews[1]);


  return(
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App
