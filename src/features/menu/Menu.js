import React, { useState, useLayoutEffect, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import dishStore from "./../../store";

import { ALL_DISHES } from "./menu.graphql";

export default () => {
  const [dishes, setDishes] = useState(dishStore.initialState);
  const { data, loading } = useQuery(ALL_DISHES);

  useLayoutEffect(() => {
    dishStore.subscribe(setDishes);
    dishStore.init();
  }, []);

  useEffect(() => {
    if (!loading && data && data.dishes !== dishes) {
      dishStore.addDishes(data.dishes);
    }
  }, [data]);

  return (
    <div>
      <h1>Menu</h1>
      <h3>dishes that is in todo and done</h3>
      <ul>
        {dishes.TODO.map(dish => (
          <li key={dish.id}>
            {JSON.stringify(dish.content, null, 2)}
            <button>todo</button>
          </li>
        ))}
        {dishes.DONE.map(dish => (
          <li key={dish.id}>
            {JSON.stringify(dish.content, null, 2)}
            <button>done</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
