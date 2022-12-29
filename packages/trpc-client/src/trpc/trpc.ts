// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../trpc-server/index";

export const trpc = createTRPCReact<AppRouter>();
