import React from "react";
import { trpc } from "../trpc";
import { Link } from "react-router-dom";
export function Chat() {
  const chats = trpc.getAllChats.useQuery();
  const createChat = trpc.sendMessage.useMutation();

  const [text, setText] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createChat
      .mutateAsync({
        receiver_email: "test@gmail.com",
        sender_text: text,
      })
      .then(() => {
        chats.refetch();
      });
  };

  return (
    <>
      <Link to="/sign-up">Go Back Sign Up</Link>
      <h5>Chat Box</h5>
      <ul>
        {chats.isSuccess &&
          chats.data.map((chat, index) => <li key={index}>{chat.text}</li>)}
      </ul>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Send</button>
      </form>
    </>
  );
}
