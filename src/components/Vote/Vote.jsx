import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";

const Vote = () => {
  const survey = useLoaderData();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const voted = survey.feedback.find((voter) => voter.email == user?.email);
  const timeOver =
    moment().unix() > moment(`${survey.deadline}`, "MM/DD/YYYY").unix();

  if (!user) {
    navigate("/login");
  }
  const handleVoting = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const ans = form.radioButton.value;
    const newVote = { email: user?.email, name: user.displayName, vote: ans };
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
          console.log("inside voting");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error in voting", error);
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${survey._id}`);
      return res.data;
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const commentInfo = { comment, email: user?.email, postId: survey._id };
    axiosSecure
      .post("/comments", commentInfo)
      .then((res) => {
        if (res.data.insertedId) {
          e.target.reset();
          refetch();
        }
      })
      .catch((error) => {
        console.log("error in inserting comment", error);
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
          <div className="mx-auto text-left w-fit card-body">
            <p className="font-bold">{survey.title}</p>
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
      {role == "pro-user" && (
        <div>
          <h1 className="mt-10 mb-6 text-2xl font-bold">
            Features for Pro Users
          </h1>
          <div>
            <form
              onSubmit={handleComment}
              className="flex items-center justify-center"
            >
              <textarea
                name="comment"
                className="ml-24 mr-5 textarea textarea-primary textarea-lg"
                placeholder="Bio"
              ></textarea>
              <button type="submit" className="my-10 btn btn-primary">
                Comment
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="mt-10 text-left">
        {comments.length > 0 && (
          <h4 className="mb-5 text-lg font-bold text-slate-500">
            Comments by pro-users.
          </h4>
        )}
        {!isLoading &&
          [...comments].reverse().map((comment, index) => (
            <div key={index} className="mb-5">
              <h1 className="font-bold">{comment.comment}</h1>
              <p className="text-sm text-slate-400">by {comment.email}</p>
            </div>
          ))}
      </div>
      <Link to={"/"}>
        <button className="my-10 btn btn-primary">Home</button>
      </Link>
    </div>
  );
};

export default Vote;
