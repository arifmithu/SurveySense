import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";
import moment from "moment/moment";

const Vote = () => {
  const survey = useLoaderData();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const voted = survey.feedback.find((voter) => voter[0] == user.email);
  const timeOver =
    moment().unix() > moment(`${survey.deadline}`, "MM/DD/YYYY").unix();
  console.log(timeOver, "time");

  const handleVoting = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const ans = form.radioButton.value;
    const newVote = [user.email, user.displayName, ans];
    axiosSecure
      .put(`/surveys/vote/${survey._id}`, newVote)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your vote has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error in voting", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="h-screen px-5 text-center md:px-12 lg:px-20 ">
      <div className="pt-3">
        <SectionTitle
          heading={"Voting Page"}
          subHeading={"Read carefully and vote"}
        ></SectionTitle>
      </div>
      <div className="mt-6 shadow-xl rounded-xl">
        <div className="shadow-xl card bg-base-100">
          <div className="flex justify-between px-4 pt-4 mt-4">
            <div>
              <h2 className="card-title">Survey Name: {survey.surveyName}</h2>
              <p className="card-title">Category : {survey.category}</p>
              {voted && (
                <p className="card-title">Total Vote : {survey.response}</p>
              )}
            </div>
            <div>
              <p>Created : {survey.created}</p>
              <p>Deadline : {survey.deadline}</p>
              <Link to={`/report/${survey._id}`}>
                <button className="mt-4 btn ">Report</button>
              </Link>
            </div>
          </div>
          <div className="card-body">
            <p>Q : {survey.description}</p>
            <form onSubmit={handleVoting}>
              <div className="">
                <input
                  type="radio"
                  name="radioButton"
                  value={"yes"}
                  id=""
                  defaultChecked
                />
                <span className="ml-2">Yes</span>
              </div>
              <div className="">
                <input type="radio" name="radioButton" value={"no"} id="" />
                <span className="ml-2">No</span>
              </div>
              <button
                disabled={voted || timeOver}
                type="submit"
                className="mt-4 btn btn-primary"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Vote Now"
                )}
              </button>

              {(voted && (
                <p className="text-red-500">You have already voted.</p>
              )) ||
                (timeOver && (
                  <p className="text-red-500">
                    The deadline of this survey is over.
                  </p>
                ))}
            </form>
          </div>
        </div>
      </div>
      <Link to={"/"}>
        <button className="btn btn-primary my-10">Home</button>
      </Link>
    </div>
  );
};

export default Vote;
