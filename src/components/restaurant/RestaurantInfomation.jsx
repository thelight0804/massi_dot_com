import react from 'react';

const RestaurantInfomation = ({name, info}) => {
  return(
    <div className="mt-4 bg-white rounded-lg shadow-md p-6 space-y-2">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="border px-4 py-2 text-gray-700 font-bold">주소</td>
            <td className="border px-4 py-2 text-gray-700">{info.address}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-gray-700 font-bold">운영시간</td>
            <td className="border px-4 py-2 text-gray-700">
              <div className="space-y-1">
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
            <td className="border px-4 py-2 text-gray-700 font-bold">휴무일</td>
            <td className="border px-4 py-2 text-gray-700">{info.closedDay}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-gray-700 font-bold">전화번호</td>
            <td className="border px-4 py-2 text-gray-700">{info.phoneNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantInfomation;