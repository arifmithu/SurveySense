import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: role } = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/users/${user.email || user.providerData[0].email}`
      );
      console.log(res.data, "resdata");
      return res.data.role;
    },
  });
  return { role };
};

export default useRole;
