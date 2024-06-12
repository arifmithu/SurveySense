import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

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
    const response = await axiosSecure.get(`/response/${id}`);
    const survey = response.data;
    const updateStatus = {
      surveyName: survey.surveyName,
      title: survey.title,
      description: survey.description,
      options: survey.options,
      category: survey.category,
      deadline: survey.deadline,
      email: survey.email,
      response: survey.response,
      feedback: survey.feedback,
      status: survey.status == "published" ? "unpublished" : "published",
      created: survey.created,
    };
    axiosSecure
      .put(`/surveys/update/${survey._id}`, updateStatus)
      .then((result) => {
        if (result.data.modifiedCount > 0) {
          refetch();
        }
      })
      .catch((error) =>
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Error in updating survey status`,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };
  const handleSendFeedback = (event, surveyName, email) => {
    event.preventDefault();
    const feedback = event.target.feedback.value;
    const newFeedback = { surveyName, email, feedback };
    axiosSecure.post("/feedbacks", newFeedback).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Feedback sent successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <>
      <SectionTitle
        heading={"All Surveys"}
        subHeading={"Posted by Surveyors"}
      ></SectionTitle>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="h-[60vh] mt-5 border border-red-500 flex overflow-x-auto overflow-y-auto rounded-lg w-full">
          <table className="table w-full overflow-x-auto">
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
                <th>Feedback</th>
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
                  <td>
                    <button
                      className="btn w-fit text-nowrap"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Send Feedback
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Feedback!</h3>
                        <form
                          onSubmit={(event) =>
                            handleSendFeedback(
                              event,
                              survey.surveyName,
                              survey.email
                            )
                          }
                          method="dialog"
                          className="flex flex-col mt-4"
                        >
                          <textarea
                            className="textarea textarea-bordered"
                            name="feedback"
                            placeholder="enter feedback..."
                          ></textarea>
                          <button type="submit" className="btn mt-4">
                            Send
                          </button>
                        </form>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Cancel</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
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

export default Surveys;
