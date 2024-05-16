import react from 'react';


const RestaurantMenu = ({ menu, info }) => {
  console.log(menu, info);


  return (
    <div className="md:flex md:flex-wrap md:justify-center">  {/*다음 줄 나열, 가운데 배치*/}

    {menu.map((item, index) => (
      <div key={index} className="md:w-1/2 md:border md: border-red-100 md:rounded-lg md:max-w-2xl md:mx-2 md:my-2">
        {/*w-1/2:넓이 차지, border: 테두리, rounded: 테두리 모양,
        max-w-2xl:크기 고정, md:mx-2 md:my-2: 요소 간의 간격 조절 */}
        <div className="flex">
          <div className="w-1/2 p-4">{/*메뉴 정보 부분의 화면*/}
            <div className="flex">
              <div className="flex-grow">
                <p className="text-lg"><strong>{item.name}</strong></p>
              </div>
            </div>
            <p className="text-sm"><strong>{item.price}</strong></p>
          </div>
          <div className="w-1/2 p-4 flex justify-end">{/*메뉴 이미지 부분의 화면*/}
            <img src={item.image}
              alt="사진" className="w-32 h-auto rounded-xl" />
          </div>
        </div>
        {/*메뉴구분선*/}
      <div className="border-t-2 border-red-100 md:hidden"></div>
      </div>
    ))}
  </div>
  );
};

export default RestaurantMenu;