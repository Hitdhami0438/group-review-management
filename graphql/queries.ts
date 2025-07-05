import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
    query getAllProducts {
        product {
            title
            price
            id
            brand
            category
            description
            discountPercentage
            rating
        }
    }
`;
