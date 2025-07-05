import { gql } from 'graphql-tag';


export const typeDefs = gql`
  type User {
    name: String
    id: String
  }

  type Product {
    id: String
    title: String
    description:  String
    price: String
    discountPercentage: String
    brand: String
    category: String
    rating: String
  }

  type Meals {
    idMeal: String
    strMeal: String
    strCategory: String
    strArea: String
    strInstructions: String
  }

  type Book {
    tital: String
    description: String
  }

  input BookPayload {
    tital: String!
    description: String!
  }

  type Mutation {
    book(payload: BookPayload): Book
  }

  type Query {
    user: [User]
    product: [Product]
    meals: [Meals]
  }
`;
