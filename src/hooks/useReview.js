import { useState } from "react";
import firebase from "@/services/firebase/firebase"
import { useNavigate } from "react-router-dom";

const useReview = () => {
  const navigate = useNavigate();
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  /**
   * Firestore에 리뷰 추가
   * @param {Object} review 리뷰 데이터
   * @returns {Promise<string>} 리뷰 ID
   */
  const addReview = async (review) => {
    setIsReviewLoading(true);
    try {
      // 리뷰 이미지 저장
      if (review.image) {
        const foodImageUrl = await firebase.storeImage(review.image, `restaurants/${review.restaurantId}/reivew/food`);
        review.image = foodImageUrl;
      }

      // 사용자 프로필 이미지 저장
      if (review.profileImage) {
        const profileImageUrl = await firebase.storeImage(review.profileImage, `restaurants/${review.restaurantId}/review/profile`);
        review.profileImage = profileImageUrl;
      }

      // 리뷰 데이터 Firestore에 추가
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

  /**
   * Firestore에 답글 추가
   * @param {Object} reply 답글 데이터
   */
  const addReply = async (reply) => {
    await firebase.addReply(reply.content, reply.restaurantId, reply.reviewIndex);
  }

  return { isReviewLoading, addReview, addReply };
};

export default useReview;