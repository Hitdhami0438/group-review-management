import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:3000/api/graphql";

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
});
