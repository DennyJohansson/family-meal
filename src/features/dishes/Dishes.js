import React, { useState, useLayoutEffect, useEffect } from "react";
import { path } from "ramda";
import dishes$ from "./../../store";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

import { ALL_DISHES, ADD_DISH } from "./Dishes.graphql";
export default () => {
  const [addDishInputValue, setAddDishInputValue] = useState("");
  const [dishes, setDishes] = useState(dishes$.initialState);
  const { data: dishData, loading } = useQuery(ALL_DISHES);
  const [addDish, { data: addDishData }] = useMutation(ADD_DISH);
  const { TODO, DONE, HISTORY } = dishes;
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ addDishInput }) => {
    // TODO: change id to current login user
    setAddDishInputValue("");
    addDish({
      variables: {
        authorId: "ck5lgp68800090746h4ychbxb",
        status: "TODO",
        content: addDishInput
      }
    });
  };

  useLayoutEffect(() => {
    dishes$.init();
    dishes$.subscribe(setDishes);
  }, []);

  useEffect(() => {
    const addDish = path(["createDish"], addDishData);
    if (addDish) {
      dishes$.addDish(addDish);
    }
  }, [addDishData]);

  useEffect(() => {
    if (!loading && dishData && dishData.dishes) {
      dishes$.addDishes(dishData.dishes);
    }
  }, [dishData, loading]);

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
      <h3>add a dish!</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="addDishInput"
          value={addDishInputValue}
          onChange={e => setAddDishInputValue(e.target.value)}
          ref={register({ required: true })}
        />
        {errors.addDishInput && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};
