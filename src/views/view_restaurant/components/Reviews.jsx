import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaStar, FaRegUser } from "react-icons/fa";
import useReview from "@/hooks/useReview";
import ReplyForm from "./replyForm";
import ScreenLoader from '@/components/common/ScreenLoader';

const Reviews = ({ name, reviews, isOwner, restaurantId, uid }) => {
  var [reviewIndex, setReviewIndex] = useState(0); // 리뷰 목록의 인덱스
  var [modal, setModal] = useState(false); // 모달 창의 상태
  const { deleteReview, deleteReply, isReviewLoading: isLoading } = useReview();

  // 리뷰 삭제 버튼 헨들러
  const onClickReviewDeleteHandler = (restaurantId, index) => {
    alert("현재 Firebase 쓰기 권한이 막혀있어, 삭제 기능을 사용할 수 없습니다. 사용하기 위해서는 thelight0804@gmail.com으로 문의해주세요.\nDelete review is currently disabled due to Firebase write permission restrictions. Please contact 'thelight0804@gmail.com'")
    // if (window.confirm("리뷰를 삭제하시겠습니까?"))
    //   deleteReview(restaurantId, index);
  }

  // 답글 달기 버튼 헨들러
  const onClickReplyHandler = (index) => {
    setReviewIndex(index);
    modal ? setModal(false) : setModal(true);
  }

  // 답글 삭제 버튼 헨들러
  const onClickDeleteHandler = (restaurantId, index) => {
    alert("현재 Firebase 쓰기 권한이 막혀있어, 삭제 기능을 사용할 수 없습니다. 사용하기 위해서는 thelight0804@gmail.com으로 문의해주세요.\nDelete reply is currently disabled due to Firebase write permission restrictions. Please contact 'thelight0804@gmail.com'")
    // if (window.confirm("답글을 삭제하시겠습니까?"))
    //   deleteReply(restaurantId, index);
  }

  return (
    <div>
      {isLoading && <ScreenLoader />}
      {reviews.map((review, index) => ( // map 함수로 reviews 배열을 순회하며 리뷰 목록을 출력
        <div key={index}>
          <div className="w-full p-4">
            <div className="flex items-center">
              {review.profileImage ? (
                <img src={review.profileImage} className="mr-1 h-8 w-8 rounded-xl" />
              ) : (
                <IconContext.Provider value={{ color: "#fca5a5" }}>
                  <FaRegUser className="mr-1 h-8 w-8 rounded-xl" />
                </IconContext.Provider>
              ) }
              <div>
                <p className="font-bold">{review.userName}</p>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="mr-2.5">
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-500">{review.date}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm">{review.content}</p>
            <p className="mt-1 inline-block rounded-lg bg-red-100 p-2 text-sm">
              {review.eatenMenu}
            </p>
            {review.image && ( // 이미지가 존재하면 출력
              <div className="flex flex-wrap">
                <img
                  key={index}
                  src={review.image}
                  alt="음식 이미지"
                  className="h-auto w-32 rounded-xl m-2"
                />
              </div>
              )
            }
            {review.uid === uid && (
              <div>
                <button
                  className="btn-gray mt-2"
                  onClick={() => onClickReviewDeleteHandler(restaurantId, index)}
                >
                  삭제
                </button>
              </div>
            )}
            {(isOwner && !review.reply) && (
              <div className="flex justify-end">
                <button
                  className="btn-primary text-sm px-2 py-2"
                  onClick={() => onClickReplyHandler(index)}
                >
                  답글 달기
                </button>
              </div>
            )}
            {modal && reviewIndex === index && (
              <div className="mt-4">
                <ReplyForm
                  reviewIndex={reviewIndex}
                  restaurantName={name}
                  restaurantId={restaurantId}
                  userName={review.userName}
                  content={review.content}
                  setModal={setModal}
                  eatenMenu={review.eatenMenu}
                />
              </div>
            )}
          </div>
          {review.reply && ( // 답글이 존재하면 출력
            <div className="rounded-lg bg-orange-100 p-4 ml-8 mr-4 text-sm">
              <p className="font-bold">사장님</p>
              <p>{review.reply}</p>
              {isOwner && ( // 답글 삭제 버튼 출력
                <div className="flex justify-end">
                  <button
                    className="btn-gray mt-2"
                    onClick={() => onClickDeleteHandler(restaurantId, index)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="h-0.5 m-4 bg-gray-100" />
        </div>
      ))}
    </div>
  );
};

/**
 * 별점을 표시하는 컴포넌트
 */
const StarRating = ({ rating }) => {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <span key={i} className="text-orange-400">
        <FaStar />
      </span>,
    );
  }
  return <div className="flex">{stars}</div>;
};

export default Reviews;
