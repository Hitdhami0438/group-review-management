import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/dashboard/groups");
      if (res.status !== 200) throw new Error("Failed to fetch groups");
      return res.data;
    },
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
};
