import { trpc } from "../trpc";

import React from "react";

export function CurrentUser() {
  const singleUser = trpc.getSingleUser.useQuery(undefined, {
    retry: 0,
  });

  return (
    <div>
      <h4>Current User is</h4>
      <p>{singleUser.data?.email}</p>
    </div>
  );
}
