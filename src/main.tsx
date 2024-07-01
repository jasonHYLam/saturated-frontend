import React from "react";
import ReactDOM from "react-dom/client";
import { StudyPage } from "./components/studyPage/StudyPage.tsx";
import { Signup } from "./components/loginSignup/Signup.tsx";
import { Login } from "./components/loginSignup/Login.tsx";
import { HomePage } from "./components/homePage/HomePage.tsx";
import { Error } from "./components/error/Error.tsx";

import "./reset.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StudyListAndCreateStudy } from "./components/homePage/studyListAndCreateStudy/StudyListAndCreateStudy.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <HomePage />,
        children: [
          { path: "/", element: <StudyListAndCreateStudy /> },
          { path: "/study/:studyId", element: <StudyPage /> },
        ],
      },
      {
        path: "/error",
        element: <Error />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
