import React, { useState, useLayoutEffect, useEffect } from "react";
import dishStore from "./../../store";

const Dishes = () => {
  const [dishes, setDishes] = useState(dishStore.initialState);

  useLayoutEffect(() => {
    console.log("asdasdsad");
    dishStore.subscribe(setDishes);
  }, []);
  console.log(dishes);
  // add rxjs
  return (
    <div>
      <h1>Histroy dishes</h1>
      <ul>
        {dishes.HISTORY.map(dish => (
          <li key={dish.id}>{dish.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dishes;
