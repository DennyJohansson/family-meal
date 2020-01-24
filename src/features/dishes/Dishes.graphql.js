import gql from "graphql-tag";

export const ADD_DISH = gql`
  mutation createDish($authorId: ID!, $status: String!, $content: String!) {
    createDish(authorId: $authorId, status: $status, content: $content) {
      id
      content
      status
    }
  }
`;

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
