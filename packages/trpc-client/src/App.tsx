import React, { useState } from "react";
import ReactDOM from "react-dom";

// trpc library
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc/";
import Signup from "./Signup";
import CurrentUser from "./CurrentUser";
import "./index.css";

const App = () => {
  const user = trpc.users.useQuery(undefined, { retry: false });

  return (
    <div className="container">
      <Signup />
      {user.isFetched && user.isError && <p>{user.error?.message}</p>}
      {!user.isError && user.data && (
        <ul>
          {user.data.map((user, index) => {
            return <li key={index}>{user.email}</li>;
          })}
        </ul>
      )}

      <CurrentUser />
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
