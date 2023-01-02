import express from "express";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createContext } from "./trpc-setup";
import { getAllUsers } from "./router/index";
import { mergeRouter } from "./trpc-setup";

const appRouter = mergeRouter(getAllUsers);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const app = express();
const port = 8080;
// created for each request
app.set("trust proxy", 1); // trust first proxy

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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
