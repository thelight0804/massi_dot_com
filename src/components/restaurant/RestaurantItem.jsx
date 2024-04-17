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
      className="flex w-full items-center border-b-2 border-stone-100 py-4 hover:bg-amber-100"
      onClick={onClickRestaurant}
    >
      <div className="h-50 m-5 w-auto">
        <img src={restaurant.image} alt="restaurant" />
      </div>
      <div>
        <h1 className="text-lg font-bold">{restaurant.name}</h1>
        <div className="flex items-center">
          <IconContext.Provider value={{ color: "orange" }}>
            <FaStar />
            <p className="font-bold">{restaurant.avgRating}</p>
          </IconContext.Provider>
        </div>
        <p>{restaurant.info.phoneNumber}</p>
        <div>
          <span className="text-stone-500">대표 메뉴</span>
          <span>&nbsp;{restaurant.mainMenu}</span>
        </div>
      </div>
    </button>
  );
};

export default RestaurantItem;