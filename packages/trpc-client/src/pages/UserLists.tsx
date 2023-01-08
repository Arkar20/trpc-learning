import React from "react";
import { trpc } from "../trpc";
export const UserLists = () => {
  const user = trpc.users.useQuery(undefined, { retry: false });

  return (
    <div className="container">
      {user.isFetched && user.isError && <p>{user.error?.message}</p>}
      {!user.isError && user.data && (
        <ul>
          {user.data.map((user, index) => {
            return <li key={index}>{user.email}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
