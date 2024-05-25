import react , { useState } from "react";
import gemini from "@/services/gemini/gemini";

const useGemini = () => {
  const [isGeminiLoading, setIsGeminiLoading] = useState(false); // 로딩 여부

  const generateReply = async (reply) => {
    setIsGeminiLoading(true);
    const prompt = `
      당신은 '${reply.restaurantName}'의 사장님입니다.\n
      '${reply.userName}'님께 감사 인사를 전하고 싶습니다.\n
      '${reply.review}'에 대한 답글을 작성해주세요.\n
      손님이 주문한 메뉴는 '${reply.eatenMenu}'입니다.\n
      손님들의 리뷰에 대해 공감과 감사의 표현을 포함하여 정중하고 성의 있게 답변합니다.\n
      문제점이 지적된 리뷰에 대해서는 사과와 함께 문제를 해결하기 위한 방안을 제시하고, 긍정적인 리뷰에 대해서는 감사의 인사를 전합니다. \n
      이모지를 적절히 사용하세요.\n
      답변에 식당 이름을 반드시 포함하고, 손님 이름을 반드시 포함하세요.\n
      하나의 답변만 생성하세요.\n
    `;
    try {
      const content = await gemini.generateText(prompt);
      setIsGeminiLoading(false);
      return content;
    } catch (e) {
      console.error('useGemini.generateReply: ', e);
      alert("답글 생성에 실패했습니다.\n다시 시도해주세요.");
      setIsGeminiLoading(false);
    }
  };

  return { generateReply, isGeminiLoading };
}

export default useGemini;