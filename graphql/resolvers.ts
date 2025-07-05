import axios from "axios";

export const resolvers = {
  Query: {
    user: () => {
      return [{ name: "hit", id: "123" }];
    },

    product: async () => {
      const { data } = await axios.get(
        "https://api.freeapi.app/api/v1/public/randomproducts"
      );

      return data.data.data.map((product: any) => ({
        id: product.id,
        tital: product.tital,
        description: product.description,
        price: product.price,
        rating: product.rating,
        discountPercentage: product.discountPercentage,
        brand: product.brand,
        category: product.category,
      }));
    },

    meals: async () => {
      const { data } = await axios.get(
        "https://api.freeapi.app/api/v1/public/meals"
      );

      return data.data.data.map((meal: any) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
      }));
    },
  },

  Mutation: {
    book: (_: any, { payload }: any) => {
      console.log(payload);
      return { tital: payload.tital, description: payload.description };
    },
  },
};