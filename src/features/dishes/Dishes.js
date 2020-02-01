import { useState, useEffect, useReducer } from "react";
import { groupBy, prop } from "ramda";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { concat } from "ramda";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

import { ALL_DISHES, ADD_DISH, CHANGE_STATUS } from "./Dishes.graphql";

const initialState = { TODO: [], DONE: [], HISTORY: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return groupBy(prop("status"), action.payload);
    // case 'addDish':
    //   return mergeWith(concat, state, groupBy(prop('status'))([action.payload]))
    default:
      throw new Error();
  }
};

const useDishes = () => {
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
  const [dishes, dispatch] = useReducer(reducer, initialState);
  const { data, loading, error } = useQuery(ALL_DISHES);
  const [addDish] = useMutation(ADD_DISH, { update: updateCache });
  const [changeStatus] = useMutation(CHANGE_STATUS);

  useEffect(() => {
    if (!loading && data && data.dishes) {
      console.log(data, loading);
      dispatch({ type: "update", payload: data.dishes });
    }
  }, [loading, data]);

  return {
    addDish,
    changeStatus,
    dishes,
    loading,
    error
  };
};
export default () => {
  const {
    addDish,
    changeStatus,
    loading,
    error,
    dishes: { TODO, DONE, HISTORY }
  } = useDishes();
  const [addDishInputValue, setAddDishInputValue] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ addDishInput }) => {
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
  if (loading || error) {
    return <h3>loading or error</h3>;
  }
  return (
    <div>
      <h1>FAMILY DISHES</h1>
      <h3>dishes that is in todo and done</h3>
      <ul>
        {concat(TODO, DONE).map(dish => (
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
