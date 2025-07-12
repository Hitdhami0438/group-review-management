import { useQuery } from "@tanstack/react-query";

export const useMembers = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {},
  });
};
