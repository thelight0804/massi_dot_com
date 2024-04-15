import React from "react";
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa";

const RestaurantItem = ({restaurant}) => {

  const onClickRestaurant = () => {
    console.log(restaurant.id);
  };

  return (
    <button 
      class="flex items-center border-b-2 border-stone-100 py-4 w-full hover:bg-amber-100"
      onClick={onClickRestaurant}
    >
      <div class="h-50 w-auto m-5">
        <img src={restaurant.image} alt="restaurant"/>
      </div>
      <div>
        <h1 class="font-bold text-lg">{restaurant.name}</h1>
        <div class="flex items-center">
          <IconContext.Provider value={{color: "orange"}}>
            <FaStar/>
            <p class="font-bold">{restaurant.avgRating}</p>
          </IconContext.Provider>
        </div>
        <p>{restaurant.info.phoneNumber}</p>
        <div>
          <span class="text-stone-500">대표 매뉴</span>
          <span>&nbsp;{restaurant.mainMenu}</span>
        </div>
      </div>
    </button>
  );
};

export default RestaurantItem;