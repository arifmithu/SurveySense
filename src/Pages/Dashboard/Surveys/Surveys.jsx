import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const Surveys = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: surveys = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-serveys"],
    queryFn: async () => {
      const res = await axiosSecure.get("/surveys");
      return res.data;
    },
  });
  return (
    <div className="w-full">
      <SectionTitle
        heading={"All Surveys"}
        subHeading={"Posted by Surveyors"}
      ></SectionTitle>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="mt-5 overflow-y-auto overflow-x-auto h-[60vh] rounded-lg">
          <table className="table ">
            {/* head */}
            <thead className="bg-[#007BFF] text-white font-bold text-xl rounded-lg">
              <tr>
                <th>#</th>
                <th>Survey Name</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Surveyor Email</th>
                <th>Total Response</th>
                <th>Status</th>
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
                  <td>
                    <p>{survey.category}</p>
                  </td>
                  <td>{survey.deadline}</td>
                  <td>{survey.email}</td>
                  <td>{survey.response}</td>
                  <td>{survey.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Surveys;
