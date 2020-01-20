import gql from "graphql-tag";

export const TODO_DISHES = gql`
  query {
    dishes(searchString: "TODO") {
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

export const DONE_DISHES = gql`
  query {
    dishes {
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

export const ALL_DISHES = gql`
  query {
    dishes {
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
