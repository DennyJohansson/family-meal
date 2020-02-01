import "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

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

export default Dish;
