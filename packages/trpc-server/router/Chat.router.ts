import { router, procedure } from "../trpc-setup";
import { auth } from "../middleware/auth";
import { z } from "zod";
const adminProcedure = procedure.use(auth);
interface I_Chats {
  sender_email: string;
  text: string;
  receiver_email: string;
}
let chats: I_Chats[] = [];

const chatRouter = router({
  getAllChats: adminProcedure.query((): I_Chats[] => {
    return chats;
  }),
  sendMessage: adminProcedure
    .input(
      z.object({
        receiver_email: z.string(),
        sender_text: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      chats.push({
        sender_email: ctx.user.email,
        text: input.sender_text,
        receiver_email: input.receiver_email,
      });

      return {
        status: true,
      };
    }),
});

export { chatRouter };
