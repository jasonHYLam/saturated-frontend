import React from "react";
import ReactDOM from "react-dom/client";
import { StudyPage } from "./components/studyPage/StudyPage.tsx";
import { Signup } from "./components/LoginSignup/Signup.tsx";
import { Login } from "./components/LoginSignup/Login.tsx";

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
        element: <StudyPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
