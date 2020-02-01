import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    dishes(searchString: String): [Dish!]!
  }

  extend type Mutation {
    createDish(authorId: ID!, status: String!, content: String!): Dish
    changeStatus(id: ID!, status: String!): Dish
  }
`;

export const resolvers = {};
