import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const Surveys = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("Change Status");
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
  const handleStatusChange = async (id, newStatus) => {
    const survey = await axiosSecure.get(`/response/${id}`);
    console.log("response ", survey);
  };
  return (
    <div className="h-full border ">
      <SectionTitle
        heading={"All Surveys"}
        subHeading={"Posted by Surveyors"}
      ></SectionTitle>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="h-auto mt-5 overflow-x-auto overflow-y-auto rounded-lg w-fit">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-[#007BFF] text-white font-bold text-xl rounded-lg">
              <tr className="w-full">
                <th>#</th>
                <th>Survey Name</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Surveyor Email</th>
                <th>Total Response</th>
                <th>Status</th>
                <th>Change Status</th>
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
                  <td>
                    <div className="flex items-center justify-end">
                      <div className="dropdown">
                        <div
                          tabIndex={0}
                          role="button"
                          className="m-1 w-28 btn"
                        >
                          {status.toUpperCase()}
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          {survey.status == "published" ? (
                            <li>
                              <button
                                onClick={() =>
                                  handleStatusChange(survey._id, "unpublished")
                                }
                              >
                                Unpublish
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button
                                onClick={() =>
                                  handleStatusChange(survey._id, "published")
                                }
                              >
                                Publish
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </td>
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
