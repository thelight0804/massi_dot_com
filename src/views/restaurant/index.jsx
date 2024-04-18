import React from 'react';
import Navigation from '@/components/common/Navigation';

const Restaurant = () => {
  return (
    <div className="p-6">
      <Navigation />
      <div className="mt-4 bg-white rounded-lg shadow-md p-6 space-y-2">
        <h2 className="text-2xl font-bold mb-2">엄마의 손맛</h2>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-gray-700 font-bold">주소</td>
              <td className="border px-4 py-2 text-gray-700">부산광역시 부산진구 연지동 000-0 (연지동)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-gray-700 font-bold">운영시간</td>
              <td className="border px-4 py-2 text-gray-700">
                <div className="space-y-1">
                  <p><strong>월요일</strong> <span>오전 11:30~오후11:30</span></p>
                  <p><strong>화요일</strong> <span>오전 11:30~오후11:30</span></p>
                  <p><strong>수요일</strong> <span>오전 11:30~오후11:30</span></p>
                  <p><strong>목요일</strong> <span>오전 11:30~오후11:30</span></p>
                  <p><strong>금요일</strong> <span>오전 11:30~오후11:30</span></p>
                  <p><strong>토요일</strong> <span>오전 11:30~오후11:30</span></p>
                  <p><strong>일요일</strong> <span>오전 11:30~오후11:30000</span></p>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-gray-700 font-bold">휴무일</td>
              <td className="border px-4 py-2 text-gray-700">연중무휴</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-gray-700 font-bold">전화번호</td>
              <td className="border px-4 py-2 text-gray-700">051-000-0000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurant;