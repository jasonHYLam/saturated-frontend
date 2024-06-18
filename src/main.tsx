import React from "react";
import ReactDOM from "react-dom/client";
import { StudyPage } from "./components/studyPage/StudyPage.tsx";
import { Signup } from "./components/loginSignup/Signup.tsx";
import { Login } from "./components/loginSignup/Login.tsx";
import { HomePage } from "./components/homePage/HomePage.tsx";

import "./reset.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
