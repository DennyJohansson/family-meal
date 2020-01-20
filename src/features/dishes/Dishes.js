import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const HISTORY_DISHES = gql`
  query {
    dishes(searchString: "HISTORY") {
      id
      status
      content
      author {
        id
        name
      }
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(HISTORY_DISHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  // add rxjs
  return (
    <div>
      <h1>Histroy dishes</h1>
      <ul>
        {data.dishes.map(dish => (
          <li key={dish.id}>{dish.content}</li>
        ))}
      </ul>
    </div>
  );
};
