import react, { useState } from "react";
import useReview from "@/hooks/useReview";

const ReplyForm = ({ reviewIndex, restaurantName, restaurantId, userName, content, setModal }) => {
  const reply = {
    reviewIndex: reviewIndex, // 리뷰 인덱스
    restaurantName: restaurantName, // 식당 이름
    restaurantId: restaurantId, // 식당 ID
    userName: userName, // 유저 이름
    review: content, // 리뷰 내용
    content: "", // 답글 내용
  };
  const [text, setText] = useState(""); // 답글 내용
  const { addReply } = useReview();

  // 답글 달기 버튼 클릭 시
  const onClickSubmitHandler = () => {
    reply.content = text; // 답글 내용 저장
    addReply(reply)
  };

  // 자동 완성 버튼 클릭 시
  const onClickGenerateHandler = () => {
    console.log("매직 버튼 클릭");
    setModal(false);
  }

  return (
    <div>
      <textarea
        id="reply"
        rows="4"
        cols="50"
        label="답글"
        value={text}
        placeholder="손님 리뷰에 대한 메시지를 전달해주세요."
        className="w-full border py-2 text-left"
        onChange={(event) => {setText(event.currentTarget.value)}}
      />
      <div className="flex justify-end space-x-4">
        <button
          className="btn-gray text-sm px-2 py-2 w-24"
          onClick={() => setModal(false)}
        >
          취소
        </button>
        <button
          className="btn-orange text-sm px-2 py-2 w-24"
          onClick={onClickGenerateHandler}
        >
         ✨ 자동 완성
        </button>
        <button
          className="btn-secondary text-sm px-2 py-2 w-24"
          onClick={onClickSubmitHandler}
        >
          답글 달기
        </button>
      </div>
    </div>
  );
};

export default ReplyForm;