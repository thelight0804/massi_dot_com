import react from 'react';

const RestaurantInfomation = ({ name, info }) => {
  return (
    <div className="bg-white shadow-md space-y-10"> {/* bg-white: 배경색, shadow-md: 그림자 */}
      <div className="bg-white shadow-md">
        <h2 className="px-4 text-2xl font-bold mb-2">{name}</h2> {/* px-4: padding, text-2xl: 글자 크기, font-bold: 글자 굵기 */}
        <table className="table-auto w-full"> {/* table-auto: 테이블 크기 자동 조절, w-full: 테이블 가로폭 100% */}
          <tbody>
            <tr>
              <td className="px-5 py-5 text-gray-700 font-bold">주소</td> {/* px-5: padding, py-5: padding, text-gray-700: 글자색 */}
              <td className="px-5 py-2 text-gray-700">{info.address}</td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-gray-700 font-bold">운영시간</td>
              <td className="px-5 py-2 text-gray-700">
                <div className="space-y-1"> {/* space-y-1: 요소 사이 간격 1 */}
                  <p><strong>월요일</strong> <span>{info.openTime}</span></p>
                  <p><strong>화요일</strong> <span>{info.openTime}</span></p>
                  <p><strong>수요일</strong> <span>{info.openTime}</span></p>
                  <p><strong>목요일</strong> <span>{info.openTime}</span></p>
                  <p><strong>금요일</strong> <span>{info.openTime}</span></p>
                  <p><strong>토요일</strong> <span>{info.openTime}</span></p>
                  <p><strong>일요일</strong> <span>{info.openTime}</span></p>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-gray-700 font-bold">휴무일</td>
              <td className="px-5 py-2 text-gray-700">{info.closedDay}</td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-gray-700 font-bold">전화번호</td>
              <td className="px-5 py-5 text-gray-700">{info.phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow-md">
        <h2 className="px-4 text-2xl font-bold mb-2">가게 소개</h2>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="px-5 py-5 text-gray-700">엄마의 손맛으로 최고의 맛을 선사합니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow-md">
        <div className="mb-10"> {/* mb-10: 배민 어플에서 마지막 정보 하단에 여백을 길게 줌. */}
          <h2 className="px-4 text-2xl font-bold mb-2">안내 및 혜택</h2>
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="px-5 py-5 text-gray-700">
                  <p>빠른 배송을 위해 아파트명 건물명이나 숙박업소 이름을 꼭 적어주세요!!</p><br></br> {/* <br>: 줄바꿈 */}
                  <p>환경보호 차원에서 앱 주문 시 '일회용 수저, 포크 안 받기' 기본 설정 적용 되어 있습니다. 체크 잘하셔서 불편함 없도록 신경 써주시기 바랍니다.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfomation;