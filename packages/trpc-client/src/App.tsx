import React, { useState } from "react";
import ReactDOM from "react-dom";

// trpc library
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc/";
import Signup from "./Signup";
import "./index.css";
let render = 1;
const App = () => {
  const user = trpc.users.useQuery();
  console.log(user);

  console.log(render++);

  if (user.isError) {
    return <p>trpc fetching failed</p>;
  }

  return (
    <div className="container">
      {user.data && (
        <ul>
          {user.data.map((user, index) => {
            return <li key={index}>{user.email}</li>;
          })}
        </ul>
      )}
      <Signup />
    </div>
  );
};

const TrpcApp = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8080/trpc",
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

ReactDOM.render(<TrpcApp />, document.getElementById("app"));
