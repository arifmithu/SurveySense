import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";

const SurveyorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const { data: surveys = [], isLoading } = useQuery({
    queryKey: ["total-surveys", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`surveys/${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="py-6 pl-4 shadow-lg">
      <div className="flex items-center gap-5">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src={user.photoURL} />
          </div>
        </div>
        <div>
          <p className="text-lg">{user.displayName}</p>
          <p>Email : {user.email}</p>
          <p>Status : {role}</p>
        </div>
      </div>
      <div className="ml-[84px]">
        <p>
          Total Surveys :
          {isLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <span className="ml-1 font-bold">{surveys.length}</span>
          )}{" "}
        </p>
      </div>
    </div>
  );
};

export default SurveyorHome;
