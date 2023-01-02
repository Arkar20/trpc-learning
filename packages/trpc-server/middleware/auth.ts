import { middleware } from "../trpc-setup";

import { TRPCError } from "@trpc/server";
const auth = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "FORBIDDEN", message: "You are not login" });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export { auth };
