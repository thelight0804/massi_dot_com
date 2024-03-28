import React from 'react'
import { useEffect } from 'react'
import './App.css'

import db from './firebase/firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

function App() {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "restaurant"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data().reviews[0]);
    });
  };

  fetchData();


  return(
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App
