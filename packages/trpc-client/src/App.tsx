import React, { useState } from "react";
import ReactDOM from "react-dom";

// trpc library
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc/";

import "./index.css";

const App = () => {
  const user = trpc.users.useQuery();

  if (!user.data) {
    return <p>trpc fetching failed</p>;
  }
  return (
    <div className="container">
      <div>Name: {user.data[0]?.email}</div>
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
