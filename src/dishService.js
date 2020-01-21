import { BehaviorSubject } from "rxjs";

const subscriber = new BehaviorSubject([]);

const dishService = {
  addDishes: dishes => {
    subscriber.next(dishes);
  }
};

export { dishService, subscriber };
