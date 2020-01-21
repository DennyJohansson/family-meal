import { Subject } from "rxjs";
import { groupBy } from "ramda";

const subject = new Subject();

const initialState = { TODO: [], DONE: [], HISTORY: [] };

let state = initialState;

const dishStore = {
  init: () => {
    subject.next(state);
  },
  subscribe: setState => subject.subscribe(setState),
  addDishes: dishes => {
    state = groupBy(dish => dish.status, dishes);
    subject.next(state);
  },
  addDish: dish => {
    state = { ...state, [dish.status]: [...state[dish.status], dish] };
    subject.next(state);
  },
  clearAllDishes: () => {
    subject.next(initialState);
  },
  initialState
};

export default dishStore;
