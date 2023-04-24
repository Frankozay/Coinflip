import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useUserStore } from "@/store/UserStore";
import { getSigner } from "@/utils/ConnectWallet";

const Navbar: React.FC = () => {
  const username = useUserStore(state => state.username);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (window.ethereum) {
        try {
          const { provider, signer } = await getSigner();
          const address = await signer.getAddress();
          const userBalance = await provider.getBalance(address);
          setBalance(ethers.utils.formatEther(userBalance));
        } catch (error) {
          alert("Error fetching balance:" + error);
        }
      }
    };

    fetchBalance();
  }, []);

  return (
    <nav className="bg-blue-200 p-4 mx-8 my-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="text-blue-900">
          <span className="font-bold">用户名：</span>
          <span className="font-semibold">{username}</span>
          <span className="ml-4 font-bold">余额：</span>
          <span className="font-semibold">{balance}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex border-2 border-blue-300 rounded-md">
            <input
              className="rounded-l-md p-2"
              type="text"
              placeholder="搜索房间"
            />
            <button className="bg-blue-300 text-white px-4 py-2 rounded-r-md">
              搜索
            </button>
          </div>
          <button className="bg-green-400 text-white px-4 py-2 rounded-md">
            创建房间
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
            查看游戏记录
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
