import react from 'react';
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  {/* 별점을 표시하는 컴포넌트 */ }
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}>
      <IconContext.Provider value={{ color: "orange" }}>
        <FaStar />
      </IconContext.Provider></span>);
  }
  return <div style={{ display: 'flex' }}>{stars}</div>; 
};

const RestaurantReviews = ({ name, reviews }) => { 
  return (
    <div>
      <div className="text-2xl font-bold">{name}</div>
      <div> {/* 리뷰 목록 */}
        {/* map 함수로 reviews 배열을 순회하며 리뷰 목록을 출력 */}
        {reviews.map((review, index) => (
          <div key={index}>
            <div className="flex">
              <div className="w-1/2 p-4">
                <img src={review.profileImage} className="w-32 h-auto rounded-xl" /> {/* 프로필 이미지 */}
                <p className="text-lg font-bold">{review.userName}</p> {/* 유저 이름 */}
                <p className="text-sm" style={{ display: 'flex', alignItems: 'center' }}> {/* 별점과 날짜 */}
                  <div style={{ marginRight: '10px' }}> {/* 별점 */}
                    <StarRating rating={review.rating} /> {/* StarRating 컴포넌트 */}
                  </div>
                  <span>{review.date}</span> {/* 날짜 */}
                </p>
                <p className="text-sm">{review.content}</p> {/* 리뷰 내용 */}
                <p className="text-sm" style={{ display: 'inline-block', backgroundColor: '#f2f2f2', padding: '5px', borderRadius: '5px' }}> {/* 메뉴 */}
                  {review.eatenMenu} {/* 메뉴 이름 */}
                </p>
              </div>
              <div className="w-1/2 p-4 flex justify-end"> {/* 이미지 */}
                <img src={review.image} alt={review.name} className="w-32 h-auto rounded-xl" /> {/* 리뷰 이미지 */}
              </div>
            </div>
            <p className="text-sm" style={{ /* 사장님 답글 */
              paddingLeft: '40px', 
              backgroundColor: '#f2f2f2', 
              padding: '10px', 
              borderRadius: '10px',
              position: 'relative',
              maxWidth: '80%',
              marginLeft: '20px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
            }}>
              {review.reply && ( // 답글이 존재하면 출력
                <>
                  <p className="text-lg font-bold">사장님</p> 
                  {review.reply} {/* 답글 내용 */}
                  <span style={{
                    content: '',
                    position: 'absolute',
                    left: '-10px',
                    top: '10px',
                    width: '0',
                    height: '0',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    borderRight: `10px solid #f2f2f2`,
                  }}></span>
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