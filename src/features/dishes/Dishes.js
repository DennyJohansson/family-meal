import React, { useState, useLayoutEffect, useEffect } from "react";
import dishes$ from "./../../store";
import { useQuery } from "@apollo/react-hooks";

import { ALL_DISHES } from "./Dishes.graphql";
export default () => {
  const [dishes, setDishes] = useState(dishes$.initialState);
  const { data, loading } = useQuery(ALL_DISHES);
  const { TODO, DONE, HISTORY } = dishes;

  useLayoutEffect(() => {
    dishes$.init();
    dishes$.subscribe(setDishes);
  }, []);

  useEffect(() => {
    if (!loading && data && data.dishes) {
      dishes$.addDishes(data.dishes);
    }
  }, [data, loading]);

  return (
    <div>
      <h1>FAMILY DISHES</h1>
      <h3>dishes that is in todo and done</h3>
      <ul>
        {TODO.map(dish => (
          <li key={dish.id}>
            {JSON.stringify(dish.content, null, 2)}
            <button>todo</button>
          </li>
        ))}
        {DONE.map(dish => (
          <li key={dish.id}>
            {JSON.stringify(dish.content, null, 2)}
            <button>done</button>
          </li>
        ))}
      </ul>
      <h3>dishes that is in history</h3>
      <ul>
        {HISTORY.map(dish => (
          <li key={dish.id}>
            {JSON.stringify(dish.content, null, 2)}
            <button>history</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
