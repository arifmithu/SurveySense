import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root/Root";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import PrivateRoute from "../Shared/PrivateRoute/PrivateRoute";
import ParticipatedSurveys from "../Pages/Dashboard/ParticipatedSurveys/ParticipatedSurveys";
import ReportedSurveys from "../Pages/Dashboard/ReportedSurveys/ReportedSurveys";
import CommentedSurveys from "../Pages/Dashboard/CommentedSurveys/CommentedSurveys";
import SurveyorHome from "../Pages/Dashboard/SurveyorHome/SurveyorHome";
import PostedSurveys from "../Pages/Dashboard/PostedSurveys/PostedSurveys";
import CreateSurvey from "../Pages/Dashboard/CreateSurvey/CreateSurvey";
import Users from "../Pages/Dashboard/Users/Users";
import Surveys from "../Pages/Dashboard/Surveys/Surveys";
import Payments from "../Pages/Dashboard/Payments/Payments";
import SurveysResponses from "../Pages/Dashboard/SurveysResponses/SurveysResponses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "/dashboard/participatedSurveys",
        element: <ParticipatedSurveys></ParticipatedSurveys>,
      },
      {
        path: "/dashboard/reportedSurveys",
        element: <ReportedSurveys></ReportedSurveys>,
      },
      {
        path: "/dashboard/commentedSurveys",
        element: <CommentedSurveys></CommentedSurveys>,
      },
      {
        path: "/dashboard/surveyorHome",
        element: <SurveyorHome></SurveyorHome>,
      },
      {
        path: "/dashboard/postedSurveys",
        element: <PostedSurveys></PostedSurveys>,
      },
      {
        path: "/dashboard/createSurvey",
        element: <CreateSurvey></CreateSurvey>,
      },
      {
        path: "/dashboard/users",
        element: <Users></Users>,
      },
      {
        path: "/dashboard/surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "/dashboard/payments",
        element: <Payments></Payments>,
      },
      {
        path: "/dashboard/surveys/responses",
        element: <SurveysResponses></SurveysResponses>,
      },
    ],
  },
]);
