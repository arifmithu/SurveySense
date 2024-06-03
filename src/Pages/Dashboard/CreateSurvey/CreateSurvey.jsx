import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateSurvey = () => {
  const [createSurvey, setCreateSurvey] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="w-full">
      {createSurvey ? (
        <>
          <div>
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-bold text-[#333333]">New Survey</h1>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-2"
            >
              <div className="space-y-1">
                <h2 className="text-lg font-bold ">Title</h2>
                <input
                  {...register("firstName")}
                  className="w-full h-10 pl-2 border-2 rounded-lg"
                  placeholder="Title"
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold ">Description</h2>
                <input
                  {...register("description")}
                  className="w-full h-10 pl-2 border-2 rounded-lg"
                  placeholder="Question here..."
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold ">Options</h2>
                <input
                  {...register("options")}
                  className="w-full h-10 pl-2 border-2 rounded-lg"
                  placeholder="yes,no etc"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-lg font-bold ">Select Category</label>
                <select
                  {...register("category")}
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
                  className="w-full h-10 pl-2 border-2 rounded-lg"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <input
                type="submit"
                class="btn btn-secondary text-white font-bold"
                value={"Publish"}
              />
            </form>
          </div>
        </>
      ) : (
        <button
          class="btn btn-secondary text-white font-bold"
          onClick={() => setCreateSurvey(true)}
        >
          Create New Survey
        </button>
      )}
    </div>
  );
};

export default CreateSurvey;
