import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SurveyorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: surveys = [], isLoading } = useQuery({
    queryKey: ["total-surveys", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`surveys/${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="py-6 pl-4 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src={user.photoURL} />
          </div>
        </div>
        <div>
          <p className="text-lg">{user.displayName}</p>
          <p>Email : {user.email}</p>
        </div>
      </div>
      <div className="ml-20">
        <p>
          Total Surveys :
          {isLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            surveys.length
          )}{" "}
        </p>
      </div>
    </div>
  );
};

export default SurveyorHome;
