import { Subject } from "rxjs";
import { groupBy, prop } from "ramda";

const subject = new Subject();

const initialState = { TODO: [], DONE: [], HISTORY: [] };
let state = initialState;
const groupByStatus = groupBy(prop("status"));
// use lenses
const dishes$ = {
  init: () => subject.next(initialState),
  subscribe: setState => subject.subscribe(setState),
  updateDishes: dishes => {
    state = groupByStatus(dishes);
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

export default dishes$;
