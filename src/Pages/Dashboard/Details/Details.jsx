import React from "react";
import { useLoaderData } from "react-router-dom";

const Details = () => {
  const survey = useLoaderData();
  console.log(survey, "survey in details");
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="table">
        {/* head */}
        <thead className="bg-[#007BFF] text-white font-bold text-xl">
          <tr>
            <th>#</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {survey.feedback?.map((user, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.vote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Details;
