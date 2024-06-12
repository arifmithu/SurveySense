import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  MdComment,
  MdHowToVote,
  MdOutlinePayment,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import { GoReport } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { TfiWrite } from "react-icons/tfi";
import { FaUsers } from "react-icons/fa6";
import { RiSurveyFill } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

const Dashboard = () => {
  const { user } = useAuth();
  const { role } = useRole();
  console.log(role, "roleing");
  return (
    <div className="flex h-full overflow-x-hidden">
      <div className="w-[25%] lg:w-[20%] min-h-screen bg-[#007BFF] text-white">
        <ul className="-space-y-2 menu">
          {role == "user" ? (
            <>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/userHome"}>
                  <CgProfile />
                  My Profile
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/participatedSurveys"}>
                  <MdHowToVote />
                  Participated Surveys
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/reportedSurveys"}>
                  <GoReport />
                  Reported Surveys
                </NavLink>
              </li>
            </>
          ) : role == "pro-user" ? (
            <>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/userHome"}>
                  <CgProfile />
                  My Profile
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/participatedSurveys"}>
                  <MdHowToVote />
                  Participated Surveys
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/reportedSurveys"}>
                  <GoReport />
                  Reported Surveys
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/commentedSurveys"}>
                  <MdComment />
                  Commented Surveys
                </NavLink>
              </li>
            </>
          ) : role == "surveyor" ? (
            <>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/surveyorHome"}>
                  <CgProfile />
                  My Profile
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/postedSurveys"}>
                  <MdOutlinePublishedWithChanges />
                  Posted Surveys
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/createSurvey"}>
                  <TfiWrite />
                  Create Survey
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/users"}>
                  <FaUsers />
                  Users
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/surveys"}>
                  <RiSurveyFill />
                  Surveys
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/surveys/responses"}>
                  <VscFeedback />
                  Surveys Responses
                </NavLink>
              </li>
              <li className="text-lg font-bold">
                <NavLink to={"/dashboard/payments"}>
                  <MdOutlinePayment />
                  Payments
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li className="text-lg font-bold">
            <NavLink to={"/"}>
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* outlet part */}
      <div className="flex-1 m-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
