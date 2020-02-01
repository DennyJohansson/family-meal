import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { concat } from "ramda";
import { useForm } from "react-hook-form";
import useDishes from "hooks/useDishes";
import Dish from "./Dish";

const Dishes = () => {
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
    addDish(addDishInput);
    setAddDishInputValue("");
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
          <Dish key={dish.id} onClick={changeStatus} dish={dish} />
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

export default Dishes;
