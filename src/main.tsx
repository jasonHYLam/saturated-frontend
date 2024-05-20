import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StudyPage } from "./components/studyPage/StudyPage.tsx";
import "./reset.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
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
