import { useState, useLayoutEffect, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { concat } from "ramda";
import dishes$ from "./../../store";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

import { ALL_DISHES, ADD_DISH, CHANGE_STATUS } from "./Dishes.graphql";

export default () => {
  const updateCache = (cache, { data }) => {
    const existingDishes = cache.readQuery({
      query: ALL_DISHES
    });

    const newDish = data.createDish;

    cache.writeQuery({
      query: ALL_DISHES,
      data: { dishes: [newDish, ...existingDishes.dishes] }
    });
  };
  const [addDishInputValue, setAddDishInputValue] = useState("");
  const [dishes, setDishes] = useState(dishes$.initialState);

  const { data: dishData, loading } = useQuery(ALL_DISHES);
  const [addDish] = useMutation(ADD_DISH, { update: updateCache });
  const [changeStatus] = useMutation(CHANGE_STATUS);

  const { TODO, DONE, HISTORY } = dishes;
  const { register, handleSubmit, errors } = useForm();

  console.log("state changed", dishes);

  const onSubmit = ({ addDishInput }) => {
    // TODO: change id to current login user

    addDish({
      variables: {
        authorId: "ck5lgp68800090746h4ychbxb",
        status: "TODO",
        content: addDishInput
      }
    });
    setAddDishInputValue("");
  };

  const onClickStatus = (id, status) => {
    changeStatus({
      variables: {
        id,
        status
      }
    });
  };

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    dishes$.init();
    dishes$.subscribe(setDishes);
  }, []);

  useEffect(() => {
    console.log(dishData);
    if (!loading && dishData && dishData.dishes) {
      console.log("updateDishes");
      dishes$.updateDishes(dishData.dishes);
    }
  }, [dishData, loading]);

  return (
    <div>
      <h1>FAMILY DISHES</h1>
      <h3>dishes that is in todo and done</h3>
      <ul>
        {concat(TODO || [], DONE || []).map(dish => (
          <Dish key={dish.id} onClick={onClickStatus} dish={dish} />
        ))}
      </ul>
      <h3>dishes that is in history</h3>
      <ul>
        {HISTORY.map(dish => (
          <Dish key={dish.id} onClick={() => null} dish={dish} />
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

const Dish = ({ dish, onClick }) => {
  const { id, title, content, status } = dish;
  const { color, nextStatus } = {
    TODO: { color: "blue", nextStatus: "DONE" },
    DONE: { color: "green", nextStatus: "HISTORY" },
    HISTORY: { color: "red", nextStatus: null }
  }[status];

  return (
    <li
      css={{
        color
      }}
    >
      {title}
      {JSON.stringify(content, null, 2)}
      <button onClick={() => onClick(id, nextStatus)}>{status}</button>
    </li>
  );
};
