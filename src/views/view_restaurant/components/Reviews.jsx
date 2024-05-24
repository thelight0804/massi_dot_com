import React from "react";
import { IconContext } from "react-icons";
import { FaStar, FaRegUser } from "react-icons/fa";

const Reviews = ({ name, reviews }) => {
  return (
    <div>
      <div className="ml-1.5 text-2xl font-bold">{name}</div> {/* 가게 이름 */}
      <div> {/* 리뷰 목록 */}
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
              {review.images && ( // 이미지가 존재하면 출력
                  <div className="flex flex-wrap">
                    {review.images.map((image, index) => (
                      <img key={index} src={image} alt={review.name} className="h-auto w-32 rounded-xl mr-2.5 mb-2.5" />
                    ))}
                  </div>
                )
              }
            </div>
            {review.reply && ( // 답글이 존재하면 출력
              <div className="rounded-lg bg-orange-100 p-4 ml-8 mr-4 text-sm">
                <p className="font-bold">사장님</p>
                <p>{review.reply}</p>
              </div>
            )}
            <div className="h-0.5 m-4 bg-gray-100" />
          </div>
        ))}
      </div>
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
