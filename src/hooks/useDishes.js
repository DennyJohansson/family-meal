import { ALL_DISHES, ADD_DISH, CHANGE_STATUS } from "graphql/dishes";
import { useEffect, useReducer } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { groupBy, prop } from "ramda";

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
  const [addDishMutation] = useMutation(ADD_DISH, { update: updateCache });
  const [changeStatusMutation] = useMutation(CHANGE_STATUS);
  const addDish = content =>
    addDishMutation({
      variables: {
        authorId: "ck5lgp68800090746h4ychbxb",
        status: "TODO",
        content: content
      }
    });
  const changeStatus = (id, status) =>
    changeStatusMutation({
      variables: {
        id,
        status
      }
    });

  useEffect(() => {
    if (!loading && data && data.dishes) {
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

export default useDishes;
