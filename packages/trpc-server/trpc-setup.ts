import { initTRPC, inferAsyncReturnType, TRPCError } from "@trpc/server";
import { Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user: {
        email?: string;
      };
    }
  }
}
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const { access_token } = req.cookies;

  let user;
  try {
    const decoded = jwt.verify(access_token, "hello");
    user = decoded;
  } catch (err) {
    user = null;
    new TRPCError({ code: "BAD_REQUEST", message: "Error in jwt" });
  }

  return { req, res, user };
};
// You can use any variable name you like.
// We use t to keep things simple.
export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
export const router = t.router;
export const middleware = t.middleware;
export const procedure = t.procedure;
export const mergeRouter = t.mergeRouters;
