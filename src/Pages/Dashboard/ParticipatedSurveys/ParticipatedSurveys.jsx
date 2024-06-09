import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ParticipatedSurveys = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: votedSurveys = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["voted-surveys", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/surveys/voted/${user.email}`);
      return res.data;
    },
  });
  return isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="overflow-x-auto rounded-lg">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-[#007BFF] text-white font-bold text-xl">
            <th>#</th>
            <th>Survey Name</th>
            <th>Total Response</th>
            <th>My Vote</th>
          </tr>
        </thead>
        <tbody>
          {votedSurveys.map((survey, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{survey.surveyName}</td>
              <td>{survey.response}</td>
              <td>
                {survey.feedback.find((obj) => obj.email == user.email).vote}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipatedSurveys;
