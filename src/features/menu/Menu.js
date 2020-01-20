import React from "react";
import { either, filter, compose, equals, prop } from "ramda";
import { useQuery } from "@apollo/react-hooks";

import { ALL_DISHES } from "./menu.graphql";

const filterByStatusTodoAndDone = filter(
  compose(either(equals("DONE"), equals("TODO")), prop("status"))
);

export default () => {
  const { loading, error, data } = useQuery(ALL_DISHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const todoAndDoneDishes = filterByStatusTodoAndDone(data.dishes);

  return (
    <div>
      <h1>Menu</h1>
      <h3>dishes that is in todo and done</h3>
      <ul>
        {todoAndDoneDishes.map(dish => (
          <li key={dish.id}>
            {JSON.stringify(dish.content, null, 2)}
            <button>
              {dish.status === "TODO" ? "move to done" : "move to history"}!
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
