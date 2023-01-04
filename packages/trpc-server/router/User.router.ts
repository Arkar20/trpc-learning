import { router, procedure } from "../trpc-setup";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth";

interface UserType {
  email: string;
  password: string;
}
interface JWTPayloadType {
  email: string;
}

const adminProcedure = procedure.use(auth);

let users: UserType[] = [];

const userRouter = router({
  users: adminProcedure.query(({ ctx }): UserType[] => {
    return users;
  }),
  getSingleUser: adminProcedure.query(({ ctx, input }) => {
    const user = ctx.user;
    // const user = users.find((user) => user.email === ctx.user.email);
    if (!user) {
      return null;
    }
    return user;
  }),

  createUser: procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { email, password } = input;

      users = [...users, { email, password }];

      const payload: JWTPayloadType = {
        email,
      };

      const token = jwt.sign(payload, "hello");

      ctx.res.cookie("access_token", token, {
        maxAge: 6000000000,
        httpOnly: true,
        secure: true,
      });

      return {
        users,
        status: true,
      };
    }),
});

export { userRouter };
