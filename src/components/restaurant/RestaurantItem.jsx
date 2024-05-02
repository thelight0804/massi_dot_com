import React from "react";
import * as ROUTE from "@/constants/routes";
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RestaurantItem = ({restaurant}) => {
  const navigate = useNavigate();

  const onClickRestaurant = () => {
    navigate(ROUTE.ViewRestaurant.replace(":id", restaurant.id), {
      state: { restaurant },
    });
  };

  return (
    <button
      className="flex w-full items-center border-b-2 border-stone-100 hover:bg-red-100 md:border-2 md:m-5 md:w-1/3"
      onClick={onClickRestaurant}
    >
      <img className="h-28 w-28 m-4 rounded-md" src={restaurant.image} alt="restaurant" />
      <div>
        <h1 className="text-lg font-bold text-left">{restaurant.name}</h1>
        <div className="flex items-center">
          <IconContext.Provider value={{ color: "orange" }}>
            <FaStar />
            <p className="font-bold">{restaurant.avgRating}</p>
          </IconContext.Provider>
        </div>
        <p className="text-left">{restaurant.info.phoneNumber}</p>
        <div>
          <span className="text-stone-500">대표 메뉴</span>
          <span>&nbsp;{restaurant.mainMenu}</span>
        </div>
      </div>
    </button>
  );
};

export default RestaurantItem;