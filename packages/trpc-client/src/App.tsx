import React, { useState } from "react";
import ReactDOM from "react-dom";

// trpc library
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc/";
import Signup from "./Signup";
import "./index.css";

const App = () => {
  const user = trpc.users.useQuery();
  console.log(user.data);
  if (!user.data) {
    return <p>trpc fetching failed</p>;
  }
  // if (!user.data.length) {
  //   return <p>No user</p>;
  // }

  return (
    <div className="container">
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
