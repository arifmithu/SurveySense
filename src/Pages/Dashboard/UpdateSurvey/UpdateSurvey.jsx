import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

const UpdateSurvey = () => {
  const survey = useLoaderData();
  const [createSurvey, setCreateSurvey] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  console.log(survey, "survey in update");

  const onSubmit = (data) => {
    console.log(data);
    const surveyName = data.surveyName;
    const title = data.title;
    const description = data.description;
    const options = data.options;
    const category = data.category;
    const deadline = moment(data.deadline).format("MM/DD/YYYY");
    const email = user.email;
    const response = 0;
    const feedback = [];

    const newSurvey = {
      surveyName,
      title,
      description,
      options,
      category,
      deadline,
      email,
      response,
      feedback,
    };
    axiosSecure.post("/surveys", newSurvey).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your survey has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };
  return (
    <div className="w-full">
      <>
        <div>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-[#333333]">Update Survey</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-bold ">Survey Name</h2>
              <input
                {...register("surveyName")}
                defaultValue={survey.surveyName}
                className="w-full h-10 pl-2 border-2 rounded-lg"
                placeholder="survey name"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold ">Title</h2>
              <input
                {...register("title")}
                defaultValue={survey.title}
                className="w-full h-10 pl-2 border-2 rounded-lg"
                placeholder="Title"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold ">Description</h2>
              <input
                {...register("description")}
                defaultValue={survey.description}
                className="w-full h-10 pl-2 border-2 rounded-lg"
                placeholder="Question here..."
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold ">Options</h2>
              <input
                {...register("options")}
                defaultValue={survey.options}
                className="w-full h-10 pl-2 border-2 rounded-lg"
                placeholder="yes,no etc"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-lg font-bold ">Select Category</label>
              <select
                {...register("category")}
                defaultValue={survey.category}
                className="p-2 border rounded-lg w-fit"
              >
                <option value="demographics">Demographics</option>
                <option value="behavioral">Behavioral</option>
                <option value="psychographics">Psychographics</option>
                <option value="product">Product</option>
                <option value="customer-satisfaction">
                  Customer Satisfaction
                </option>
                <option value="market-research">Market Research</option>
                <option value="employee-feedback">Employee Feedback</option>
                <option value="event-feedback">Event Feedback</option>
              </select>
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold ">Deadline</h2>
              <input
                {...register("deadline")}
                defaultValue={survey.deadline}
                className="w-full h-10 pl-2 border-2 rounded-lg"
                placeholder="MM/DD/YYYY"
              />
            </div>
            <input
              type="submit"
              class="btn btn-secondary text-white font-bold"
              value={"Update"}
            />
          </form>
        </div>
      </>
    </div>
  );
};

export default UpdateSurvey;
