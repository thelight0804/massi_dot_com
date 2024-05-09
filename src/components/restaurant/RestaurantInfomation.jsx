import react from 'react';

const RestaurantInfomation = ({ name, info }) => {
  return (
    <div className="bg-white shadow-md space-y-10"> {/* bg-white: 배경색, shadow-md: 그림자 */}
      <div className="bg-white shadow-md">
        <h2 className="px-4 text-2xl font-bold mb-2 pt-2">{name}</h2> {/* px-4: padding, text-2xl: 글자 크기, font-bold: 글자 굵기 */}
        <table className="table-auto w-auto"> {/* table-auto: 테이블 크기 자동 조정, w-auto: 너비 자동 조정 */}
          <tbody>
            <tr>
              <td className="px-5 py-5 text-gray-700 font-bold">주소</td> {/* px-5: padding, py-5: padding, text-gray-700: 글자색 */}
              <td className="px-5 py-2 text-gray-700">{info.address}</td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-gray-700 font-bold">운영시간</td>
              <td className="px-5 py-2 text-gray-700">
                <div className="space-y-1"> {/* space-y-1: 요소 사이 간격 1 */}
                  <p><span>{info.openTime} ~ {info.closeTime}</span></p>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-gray-700 font-bold">휴무일</td>
              <td className="px-5 py-2 text-gray-700">{info.closedDay}</td>
            </tr>
            <tr>
              <td className="px-5 py-2 text-gray-700 font-bold">전화번호</td>
              <td className="px-5 py-5 text-gray-700 underline underline-offset-1">{info.phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantInfomation;