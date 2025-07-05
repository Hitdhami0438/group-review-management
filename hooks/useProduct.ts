import { GET_PRODUCTS } from "@/graphql/queries";
import { graphQLClient } from "@/lib/graphql-client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Products = {
  title: string;
  price: string;
  id: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: string;
  rating: string;
};

type ProductResponse = {
  product: Products[];
};

async function Product() {
  const { product } = await graphQLClient.request<ProductResponse>(
    GET_PRODUCTS
  );
  return { product };
}

// export const Products = async () => {
//   const { data } = await axios.get(
//     "https://api.freeapi.app/api/v1/public/randomproducts"
//   );
//   return data.data.data;
// };

// export const useProducts = () =>
//   useQuery({
//     queryKey: ["products"],
//     queryFn: Products,
//     staleTime: 10000,
//     gcTime: 10000
//   });

export const useProduct = () => {
  return useQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: Product,
    staleTime: 20000,
    // gcTime: 10000,
    // refetchInterval: 1,
    // refetchIntervalInBackground: true
  });
};
