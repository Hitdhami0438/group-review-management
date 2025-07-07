import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/dashboard/members");
      if (res.status !== 200) throw new Error("Failed to fetch members");
      return res.data;
    },
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
};
