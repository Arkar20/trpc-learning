//react router
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Chat, CurrentUser, Signup } from "./pages/";
import { Layout } from "./Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      return {
        loaded: true,
      };
    },
    children: [
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/",
        element: <CurrentUser />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

export { router };
