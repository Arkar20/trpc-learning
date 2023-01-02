import { router, procedure } from "../trpc-setup";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth";

interface UserType {
  email: string;
  password: string;
}

const adminProcedure = procedure.use(auth);

let users: UserType[] = [];

const getAllUsers = router({
  users: adminProcedure.query(({ ctx }): UserType[] => {
    return users;
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

      const token = jwt.sign({ email }, "hello");

      ctx.res.cookie("access_token", token, {
        maxAge: 60000,
        httpOnly: true,
        secure: true,
      });

      return {
        users,
        status: true,
      };
    }),
});

export { getAllUsers };
