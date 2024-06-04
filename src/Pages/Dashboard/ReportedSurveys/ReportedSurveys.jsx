import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ReportedSurveys = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reported-serveys", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/surveys/reported/${user.email}`);
      return res.data;
    },
  });
  let reportedSurveys;
  let reports;
  if (!isLoading) {
    ({ reportedSurveys, reports } = data);
  }
  console.log(reportedSurveys, reports, "all");
  return isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="overflow-x-auto rounded-lg border">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="bg-[#007BFF] text-white font-bold text-xl">
            <th>#</th>
            <th>Survey Name</th>
            <th>Reported text</th>
            <th>Survey Status</th>
          </tr>
        </thead>
        <tbody>
          {reportedSurveys.map((survey, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{survey.surveyName}</td>
              <td>{reports.find((e) => e.postId == survey._id).text}</td>
              <td>{survey.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedSurveys;
