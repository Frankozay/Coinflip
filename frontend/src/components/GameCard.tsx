import React from "react";
import { BsFillPersonFill } from "react-icons/bs";

interface GameCardProps {
  roomId: string;
  hostUsername: string;
  betSize: number;
  numberOfPlayers: string;
  gameStatus: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  roomId,
  hostUsername,
  betSize,
  numberOfPlayers,
  gameStatus,
}) => {
  return (
    <div className="w-96 h-30 bg-gradient-to-b from-blue-100 to-white shadow-md border-blue-100 border-2 rounded-lg p-4 flex justify-between">
      <div>
        <p className="text-blue-800 text-base font-semibold">{`房间号: ${roomId}`}</p>
        <p className="text-blue-800 text-sm">{`房主: ${hostUsername}`}</p>
      </div>
      <div>
        <p className="text-blue-500 text-sm">{`赌注: ${betSize} ETH`}</p>
        <div className="flex items-center text-black-700 text-sm">
          <BsFillPersonFill className="mr-1" />
          <p>{`${numberOfPlayers}/2`}</p>
        </div>
        <div className="flex items-center">
          <span
            className={`inline-block rounded-full h-2 w-2 mr-2 ${
              gameStatus === "进行中" ? "bg-red-400" : "bg-green-700"
            }`}></span>
          <p
            className={`text-sm font-semibold ${
              gameStatus === "进行中" ? "text-red-400" : "text-green-700"
            }`}>
            {gameStatus}
          </p>
        </div>
      </div>
    </div>
  );
};
