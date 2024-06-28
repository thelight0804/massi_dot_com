import react, { useEffect, useState } from "react";
import useReview from "@/hooks/useReview";
import useGemini from "@/hooks/useGemini";
import ScreenLoader from '@/components/common/ScreenLoader';

const ReplyForm = ({ reviewIndex, restaurantName, restaurantId, userName, content, setModal, eatenMenu }) => {
  const reply = {
    reviewIndex: reviewIndex, // 리뷰 인덱스
    restaurantName: restaurantName, // 식당 이름
    restaurantId: restaurantId, // 식당 ID
    userName: userName, // 유저 이름
    review: content, // 리뷰 내용
    eatenMenu: eatenMenu, // 손님이 주문한 메뉴
    content: "", // 답글 내용
  };
  const [text, setText] = useState(""); // 답글 내용
  const { addReply, isReviewLoading } = useReview();
  const { generateReply, isGeminiLoading } = useGemini();

  useEffect(() => {
    alert("현재 Firebase 쓰기 권한이 막혀있어, 답글 작성 기능 및 자동 완성 기능을 사용할 수 없습니다. 사용하기 위해서는 thelight0804@gmail.com으로 문의해주세요.\nWrite reply and AI generate is currently disabled due to Firebase write permission restrictions. Please contact 'thelight0804@gmail.com'")
  }, [])

  // 답글 달기 버튼 클릭 시
  const onClickSubmitHandler = async () => {
    if (!text) {
      alert("답글을 입력해주세요.");
      return;
    }
    reply.content = text; // 답글 내용 저장
    try {
      await addReply(reply);
      alert("답글이 등록되었습니다.");
      location.reload();
    } catch (e) {
      alert("답글 등록에 실패했습니다.\n다시 시도해주세요.");
    }
  };

  // 자동 완성 버튼 클릭 시
  const onClickGenerateHandler = () => {
    setText("✨ 답글 생성 중...");
    generateReply(reply).then((content) => {
      setText(content);
    });
  }

  return (
    <div>
      {isReviewLoading && <ScreenLoader />}
      <textarea
        id="reply"
        rows="4"
        cols="50"
        label="답글"
        value={text}
        disabled={isGeminiLoading}
        placeholder="손님 리뷰에 대한 메시지를 전달해주세요."
        className="w-full border py-2 text-left"
        onChange={(event) => {setText(event.currentTarget.value)}}
      />
      <div className="md:flex md:justify-end md:space-x-4">
        <button
          className="block btn-secondary text-sm px-2 py-2 mt-2 w-full md:w-24"
          onClick={() => {alert("현재 Firebase 쓰기 권한이 막혀있어, 답글 작성 기능 및 자동 완성 기능을 사용할 수 없습니다. 사용하기 위해서는 thelight0804@gmail.com으로 문의해주세요.\nWrite reply and AI generate is currently disabled due to Firebase write permission restrictions. Please contact 'thelight0804@gmail.com'")}}
          // onClick={onClickSubmitHandler}
        >
          답글 달기
        </button>
        <button
          className="block btn-orange text-sm px-2 py-2 mt-2 w-full md:w-24"
          onClick={() => {alert("현재 Firebase 쓰기 권한이 막혀있어, 답글 작성 기능 및 자동 완성 기능을 사용할 수 없습니다. 사용하기 위해서는 thelight0804@gmail.com으로 문의해주세요.\nWrite reply and AI generate is currently disabled due to Firebase write permission restrictions. Please contact 'thelight0804@gmail.com'")}}
          // onClick={onClickGenerateHandler}
        >
         ✨ 자동 완성
        </button>
        <button
          className="block btn-gray text-sm px-2 py-2 mt-2 w-full md:w-24"
          onClick={() => setModal(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ReplyForm;