import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const PostedSurveys = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: surveys = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["surveys", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/surveys/${user.email}`);
      console.log(res, "res from tanstack");
      return res.data;
    },
  });
  console.log(surveys, isLoading, isPending, "states");
  return (
    <>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="table ">
            {/* head */}
            <thead className="bg-[#007BFF] text-white font-bold text-xl rounded-lg">
              <tr>
                <th>#</th>
                <th>Survey Name</th>
                <th>Status</th>
                <th>Response</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((survey, index) => (
                <tr className="">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{survey.surveyName}</div>
                    </div>
                  </td>
                  <td>{survey.status.toUpperCase()}</td>
                  <td>
                    <Link to={`/dashboard/response/${survey._id}`}>
                      <button className="btn">Response</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/dashboard/update/${survey._id}`}>
                      <button className="btn">Update</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PostedSurveys;
