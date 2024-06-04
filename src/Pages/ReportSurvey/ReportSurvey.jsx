import React from "react";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ReportSurvey = () => {
  const survey = useLoaderData();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleReport = (e) => {
    e.preventDefault();
    const report = e.target.reportDetails.value;
    const reportDetails = {
      postId: survey._id,
      email: user.email,
      text: report,
    };
    axiosPublic
      .post("/reports", reportDetails)
      .then((res) => {
        console.log(res, "response of report");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your report has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error, "error in reporting");
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Your have already reported this survey",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="mx-5 md:mx-12 lg:mx-20 text-center">
      <SectionTitle
        heading={"Report"}
        subHeading={"Tell use in details about this survey"}
      ></SectionTitle>
      <div className="mt-10">
        <div>
          <p>Survey Name: {survey.surveyName}</p>
          <p>Survey Id: {survey._id}</p>
        </div>
        <div className="w-full py-10">
          <form onSubmit={handleReport}>
            <textarea
              placeholder="Details..."
              name="reportDetails"
              className="textarea textarea-bordered textarea-lg textarea-warning w-full max-w-xs"
            ></textarea>
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportSurvey;
