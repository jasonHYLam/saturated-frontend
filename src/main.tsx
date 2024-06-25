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
      },
      {
        path: "/study",
        element: <StudyPage />,
      },
      {
        path: "/study/:id",
        element: <StudyPage />,
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
