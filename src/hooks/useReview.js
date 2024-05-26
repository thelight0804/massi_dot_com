import { useEffect, useState } from "react";
import firebase from "@/services/firebase/firebase"
import { useNavigate } from "react-router-dom";
import clova from "@/services/clova/clova"
import useGemini from "./useGemini";

const useReview = () => {
  const navigate = useNavigate();
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const { generateReply } = useGemini();

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

      alert("리뷰 등록이 완료되었습니다.");
      navigate(-1); // 이전 페이지로 이동
      return id;
    } catch (e) {
      return e;
    } finally {
      setIsReviewLoading(false);
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
    try {
      await firebase.addReply(reply.content, reply.restaurantId, reply.reviewIndex);
    } catch (e) {
      return e;
    } finally {
      setIsReviewLoading(false);
    }
  }

  const generateAllReply = async (restaurant, restaurantId, reviews) => {
    setIsReviewLoading(true);
    try {
      for (let i = 0; i < reviews.length; i++) {
        // 답글이 없는 리뷰에 대해서만 답글 생성
        if (!reviews[i].reply) {
          const reply = {
            restaurantName: restaurant.name,
            userName: reviews[i].userName,
            review: reviews[i].content,
            eatenMenu: reviews[i].eatenMenu,
          }
          
          // 답글 생성
          const content = await generateReply(reply);

          // 생성된 답글 추가
          if (content) {
            await addReply({ content, restaurantId, reviewIndex: i });
          }
        }
      }
    } catch (e) {
      console.error('useReview.generateAllReply: ', e);
      alert("답글 생성에 실패했습니다.\n다시 시도해주세요.");
    } finally {
      setIsReviewLoading(false);
    }
  }

  /**
   * 텍스트 감정 분석
   * @param {String} text 감정을 분석할 텍스트
   * @returns {Promise<Object>} 감정 분석 결과
   */
  const sentimentAnalysis = async (text) => {
    return await clova.sentimentAnalysis(text);
  }

  return { isReviewLoading, addReview, addReply, deleteReview, generateAllReply, sentimentAnalysis };
};

export default useReview;