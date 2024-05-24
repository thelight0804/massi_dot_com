const Infomation = ({ name, info }) => {
  return (
    <div className="bg-white shadow-md space-y-10">
      <div className="bg-white shadow-md">
        <h2 className="px-4 text-2xl font-bold mb-2 pt-2">{name}</h2>
        <table className="table-auto w-auto">
          <tbody><tr>
            <td className="px-5 py-5 text-gray-700 font-bold">주소</td>
            <td className="px-5 py-2 text-gray-700">{info.address}</td>
          </tr><tr>
            <td className="px-5 py-2 text-gray-700 font-bold">운영시간</td>
            <td className="px-5 py-2 text-gray-700">
              <div className="space-y-1">
                <p><span>{info.openTime} ~ {info.closeTime}</span></p>
              </div>
            </td>
          </tr><tr>
            <td className="px-5 py-2 text-gray-700 font-bold">휴무일</td>
            <td className="px-5 py-2 text-gray-700">{info.closedDay}</td>
          </tr><tr>
            <td className="px-5 py-2 text-gray-700 font-bold">전화번호</td>
            <td className="px-5 py-5 text-gray-700 underline underline-offset-1">{info.phoneNumber}</td>
          </tr></tbody>
        </table>
      </div>
    </div>
  );
};

export default Infomation;