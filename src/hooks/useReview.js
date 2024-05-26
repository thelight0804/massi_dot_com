import { useEffect, useState } from "react";
import firebase from "@/services/firebase/firebase"
import { useNavigate } from "react-router-dom";
import firebase from "@/services/firebase/firebase"
import clova from "@/services/clova/clova"

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

  const deleteReview = async (restaurantId, reviewIndex) => {
    setIsReviewLoading(true);
    try {
      await firebase.deleteReview(restaurantId, reviewIndex);
      alert("리뷰가 삭제되었습니다.");
      location.reload();
    } catch (e) {
      alert("리뷰 삭제에 실패했습니다.\n다시 시도해주세요.");
      return e;
    } finally {
      setIsReviewLoading(false);
    }
  }

  /**
   * Firestore에 답글 추가
   * @param {Object} reply 답글 데이터
   */
  const addReply = async (reply) => {
    setIsReviewLoading(true);
    await firebase.addReply(reply.content, reply.restaurantId, reply.reviewIndex);
    setIsReviewLoading(false);
    location.reload(); // 페이지 새로고침 FIXME: 리팩토링 필요
  }

  /**
   * 텍스트 감정 분석
   * @param {String} text 감정을 분석할 텍스트
   * @returns {Promise<Object>} 감정 분석 결과
   */
  const sentimentAnalysis = async (text) => {
    return await clova.sentimentAnalysis(text);
  }

  return { isReviewLoading, addReview, addReply, deleteReview, sentimentAnalysis };
};

export default useReview;