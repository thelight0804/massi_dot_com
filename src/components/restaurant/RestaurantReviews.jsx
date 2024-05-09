import react from 'react';
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  {/* 별점을 표시하는 컴포넌트 */ }
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i} className="text-orange-400">
      <FaStar />
    </span>);
  }
  return <div className="flex">{stars}</div>;
};

const RestaurantReviews = ({ name, reviews }) => {
  return (
    <div>
      <div className="text-2xl font-bold ml-1.5">{name}</div> {/* 가게 이름 */}
      <div> {/* 리뷰 목록 */}
        {/* map 함수로 reviews 배열을 순회하며 리뷰 목록을 출력 */}
        {reviews.map((review, index) => (
          <div key={index}>
            <div className="flex">
              <div className="w-1/2 p-4">
                <div className="flex items-center">
                  <img src={review.profileImage} className="w-5 h-5 rounded-xl mr-1" /> {/* 프로필 이미지 */}
                  <p className="text-lg font-bold">{review.userName}</p> {/* 유저 이름 */}
                </div>
                <p className="text-sm flex items-center"> {/* 별점과 날짜 */}
                  <div className="mr-2.5"> {/* 별점 */}
                    <StarRating rating={review.rating} /> {/* StarRating 컴포넌트 */}
                  </div>
                  <span>{review.date}</span> {/* 날짜 */}
                </p>
                <div className="flex flex-col"> {/* 리뷰 내용과 이미지 */}
                  <div className="w-full p-4"> 
                    <p className="text-sm">{review.content}</p> {/* 리뷰 내용 */}
                    <p className="text-sm inline-block bg-slate-200 p-1.5 rounded-lg mt-1">
                      {review.eatenMenu} {/* 메뉴 이름 */}
                    </p>
                    <div className="w-1/2 p-4 flex justify-end"> {/* 리뷰 이미지 */}
                      <img src={review.image} alt={review.name} className="w-32 h-auto rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm bg-slate-200 p-2.5 rounded-lg relative max-w-screen-lg ml-7">
              {review.reply && ( // 답글이 존재하면 출력
                <>
                  <p className="text-lg font-bold">사장님</p>
                  {review.reply} {/* 답글 내용 */}
                  <span className="absolute border-t border-b border-r 
                                  -left-2.5 top-2.5 w-0 h-0 
                                  border-transparent">
                  </span>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantReviews;