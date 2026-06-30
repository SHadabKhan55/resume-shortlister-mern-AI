import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JobForm from "./pages/JobForm";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Apply from "./pages/Apply";

const router = createBrowserRouter([
  {
    path: "/",
    element: <JobForm />,
  },
  {
    path: "/jobs",
    element: <Jobs/>,
  },
    {
    path: "/job/:id",
    element: <JobDetail />,
  },
    {
    path: "/apply-job/:id",
    element: <Apply/>
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;