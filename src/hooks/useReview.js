import { useState } from "react";
import firebase from "@/services/firebase"
import { useNavigate } from "react-router-dom";

const useReview = () => {
  const navigate = useNavigate();
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  const addReview = async (review) => {
    setIsReviewLoading(true);
    try {
      const id = await firebase.addReview(review);
      setIsReviewLoading(false);
      alert("리뷰 등록이 완료되었습니다.");
      navigate(-1); // 이전 페이지로 이동
      return id;
    } catch (e) {
      setIsReviewLoading(false);
      return e;
    }
  }

  return { isReviewLoading, addReview };
};

export default useReview;