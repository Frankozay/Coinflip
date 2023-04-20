import React from "react";
import { useUserStore } from "@/store/UserStore";

const GameHall: React.FC = () => {
  const { address, username, loggedIn } = useUserStore();

  return (
    <div>
      <div>Address: {address}</div>
      <div>Username: {username}</div>
      <div>LoggedIn: {loggedIn.toString()}</div>
    </div>
  );
};

export default GameHall;
