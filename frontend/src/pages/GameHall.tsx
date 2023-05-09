import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { debounce } from "lodash";
import { GameCard } from "@/components/GameCard";

const GameHall: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  useEffect(() => {
    const debouncedUpdate = debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, 300);

    debouncedUpdate(searchValue);
    return () => {
      debouncedUpdate.cancel();
    };
  }, [searchValue]);

  // Create a mock array for testing
  const mockGameData = new Array(20).fill({
    roomId: "12343",
    hostUsername: "asd",
    betSize: 0.1,
    numberOfPlayers: "1",
    gameStatus: "进行中",
  });

  return (
    <div>
      <Navbar searchValue={searchValue} onSearchValueChange={setSearchValue} />
      {debouncedSearchValue}
      <div className="flex flex-wrap justify-center">
        {mockGameData.map((gameData, index) => (
          <div key={index} className="m-4">
            <GameCard {...gameData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHall;
