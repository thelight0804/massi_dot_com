import React from "react";
import RestaurantItem from "./RestaurantItem";

const RestaurantGrid = ({restaurants}) => {
  return (
    <div className="md:flex md:flex-wrap md:justify-center">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantGrid;