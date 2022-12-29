import { router, procedure } from "../trpc-setup";
import { z } from "zod";
interface UserType {
  email: string;
  password: string;
}

let users: UserType[] = [];

const getAllUsers = router({
  users: procedure.query((): UserType[] => {
    return users;
  }),
  createUser: procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => {
      console.log("🚀 ~ file: User.model.ts:23 ~ .mutation ~ input", input);
      const { email, password } = input;
      users = [...users, { email, password }];
      return {
        users,
        status: true,
      };
    }),
});

export { getAllUsers };
