import react from 'react';


const RestaurantMenu = ({ menu, info }) => {
  console.log(menu, info);


  return (
    <div>
      {/*1번째 메뉴*/}
      <div className></div>
      <div className="flex">
        <div className="w-1/2 p-4">
          <div className="flex">
            <div className="flex-none">
              
            </div>
            <div className="flex-grow">
              <p className="text-lg"><strong>{menu[0].name}</strong></p>
            </div>
          </div>
          <p className="text-sm"><strong>{menu[0].price}</strong></p>
        </div>
        <div className="w-1/2 p-4 flex justify-end">
          <img src={menu[0].image}
            alt="사진" className="w-32 h-auto rounded-xl" />
        </div>
      </div>


      {/*2번째 메뉴*/}
      <div className="border-t-2 border-red-100 ..."></div>
      <div className="flex">
        <div className="w-1/2 p-4 ">
          <p className="text-lg"><strong>{menu[1].name}</strong></p>
          <p className="text-sm"><strong>{menu[1].price}</strong></p>
        </div>
        <div className="w-1/2 p-4 flex justify-end">
          <img src={menu[1].image}
            alt="사진" className="w-32 h-auto rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;