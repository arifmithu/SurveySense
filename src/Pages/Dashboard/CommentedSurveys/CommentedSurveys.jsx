import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CommentedSurveys = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: surveys = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-surveys", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/all/${user.email}`);
      return res.data;
    },
  });

  return isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : isError ? (
    <div className="flex items-center justify-center text-3xl font-bold">
      Something went wrong.
    </div>
  ) : surveys.commentedSurveys.length == 0 ? (
    <div className="flex items-center justify-center w-full h-20 mt-10 border rounded-lg">
      No comments found. Comment in surveys to see the list.
    </div>
  ) : (
    <div className="w-full overflow-hidden border-2 rounded-lg">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-[#007BFF] border text-white font-bold text-xl w-full">
            <th>#</th>
            <th>Survey Name</th>
            <th>Total Response</th>
            <th>My Comment</th>
          </tr>
        </thead>
        <tbody>
          {surveys.commentedSurveys.map((survey, index) => (
            <tr key={index} className="border-2">
              <th>{index + 1}</th>
              <td>{survey.surveyName}</td>
              <td>{survey.response}</td>
              <td>{surveys.comments[index].comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentedSurveys;
