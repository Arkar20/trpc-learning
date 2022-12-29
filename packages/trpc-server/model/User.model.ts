import { router, procedure } from "../trpc-setup";
import { z } from "zod";
interface UserType {
  id: string;
  email: string;
  password: string;
}

const users: UserType[] = [];

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

      return {
        status: true,
      };
    }),
});

export { getAllUsers };
