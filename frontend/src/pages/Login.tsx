import React, { useEffect, useState } from "react";
import LottieAnimation from "lottie-react";
import coinFlipAnimation from "@/assets/abis/coinFlipAnimation.json";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { CoinFlipGameABI, CoinFlipGameAddress } from "@/contract/CoinFlipGame";
import { getSigner } from "@/utils/ConnectWallet";
import UsernameDialog from "@/components/UsernameDialog";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const Login: React.FC = () => {
  const [showUsernameDialog, setShowUsernameDialog] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [address, setAddress] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleUsernameSubmit = async (username: string) => {
    // 在这里调用合约的 setUsername 函数
    if (contract) {
      try {
        const transaction = await contract.setUsername(username);
        await contract.provider.waitForTransaction(transaction.hash);
        const newUsername = await contract.usernameByAddress(address);
        console.log("Username in SubmitDialog:", newUsername);
        setUsername(newUsername);
      } catch (error) {
        alert("Error setting username:" + error);
      }
    } else {
      alert("Some Error in contract");
    }
    setShowUsernameDialog(false);
  };

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        if (!window.ethereum.selectedAddress) {
          const signer = await getSigner();
          const address = await signer.getAddress();
          setAddress(address);
          const contract = new ethers.Contract(
            CoinFlipGameAddress,
            CoinFlipGameABI,
            signer
          );
          setContract(contract);
          const newUsername = await contract.usernameByAddress(address);
          setUsername(newUsername);
          if (!newUsername) {
            setShowUsernameDialog(true);
          }
        }
      } catch (error) {
        alert("Error connecting to MetaMask:" + error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      (async function getInfo() {
        try {
          const signer = await getSigner();
          const address = await signer.getAddress();
          setAddress(address);
          const contract = new ethers.Contract(
            CoinFlipGameAddress,
            CoinFlipGameABI,
            signer
          );
          setContract(contract);
          const username = await contract.usernameByAddress(address);
          setUsername(username);
          if (!username) {
            setShowUsernameDialog(true);
          }
        } catch (error) {
          alert("Error connecting to MetaMask:" + error);
        }
      })();
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="bg-gradient-to-r from-blue-300 to-blue-600 absolute inset-0"
        style={{
          zIndex: -1,
        }}
      />
      <LottieAnimation
        animationData={coinFlipAnimation}
        loop
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          paddingBottom: "200px",
          zIndex: -1,
        }}
      />
      <button
        onClick={handleLogin}
        className="bg-white hover:bg-opacity-60 text-blue-900 font-bold py-2 px-4 rounded shadow mt-60 transition duration-200 border border-blue-900 hover:border-opacity-60">
        Log in with MetaMask
      </button>

      <UsernameDialog
        open={showUsernameDialog}
        onSubmit={handleUsernameSubmit}
      />
    </div>
  );
};

export default Login;
