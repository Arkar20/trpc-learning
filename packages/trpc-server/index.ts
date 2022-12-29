import express from "express";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

import { getAllUsers } from "./model/index";
import { mergeRouter } from "./trpc-setup";

const appRouter = mergeRouter(getAllUsers);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const app = express();
const port = 8080;
// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`trpc-server listening at http://localhost:${port}`);
});
