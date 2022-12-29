import { t, router, procedure } from "../trpc-setup";

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
});

export { getAllUsers };
