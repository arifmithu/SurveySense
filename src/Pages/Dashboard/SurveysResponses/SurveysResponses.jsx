import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const SurveysResponses = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: surveys = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/surveys`);
      console.log(res, "res from tanstack");
      return res.data;
    },
  });
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
                <th>Total Response</th>
                <th>View Details</th>
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
                  <td>{survey.response}</td>
                  <td>
                    <Link to={`/surveys/vote/${survey._id}`}>
                      <button className="btn">Details</button>
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

export default SurveysResponses;
