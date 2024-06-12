import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const Feedback = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: feedback = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["feedback", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedbacks/${user.email}`);
      return res.data;
    },
  });
  return (
    <>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : isError ? (
        <div className="flex items-center justify-center w-full h-20 mt-10 border rounded-lg">
          Something went wrong.
        </div>
      ) : feedback.length == 0 ? (
        <div className="flex items-center justify-center w-full h-20 mt-10 border rounded-lg">
          No feedback is received yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="table ">
            {/* head */}
            <thead className="bg-[#007BFF] text-white font-bold text-xl rounded-lg">
              <tr>
                <th>#</th>
                <th>Survey Name</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((feed, index) => (
                <tr className="">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{feed.surveyName}</div>
                    </div>
                  </td>
                  <td>{feed.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Feedback;
