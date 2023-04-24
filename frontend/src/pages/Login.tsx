import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LottieAnimation from "lottie-react";
import coinFlipAnimation from "@/assets/abis/coinFlipAnimation.json";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { CoinFlipGameABI, CoinFlipGameAddress } from "@/contract/CoinFlipGame";
import { getSigner } from "@/utils/ConnectWallet";
import UsernameDialog from "@/components/UsernameDialog";
import { useUserStore } from "@/store/UserStore";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const Login: React.FC = () => {
  const { address, loggedIn, setAddress, setUsername, setLoggedIn } =
    useUserStore();

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const [showUsernameDialog, setShowUsernameDialog] = React.useState(false);

  const handleUsernameSubmit = async (username: string) => {
    if (!address) {
      alert("Address not found.");
      return;
    }

    const { signer } = await getSigner();
    const contract = new ethers.Contract(
      CoinFlipGameAddress,
      CoinFlipGameABI,
      signer
    );

    try {
      const transaction = await contract.setUsername(username);
      await contract.provider.waitForTransaction(transaction.hash);
      setUsername(username);
      setLoggedIn(true);
      navigate("/gameHall");
    } catch (error) {
      alert("Error setting username:" + error);
    }
    setShowUsernameDialog(false);
  };

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const { signer } = await getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        const contract = new ethers.Contract(
          CoinFlipGameAddress,
          CoinFlipGameABI,
          signer
        );
        const newUsername = await contract.usernameByAddress(address);
        if (!newUsername) {
          setShowUsernameDialog(true);
        } else {
          setUsername(newUsername);
          setLoggedIn(true);
          navigate("/gameHall");
        }
      } catch (error) {
        alert("Error connecting to MetaMask in Login:" + error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      (async function getInfo() {
        try {
          if (loggedIn) {
            navigate("/gameHall");
          }
          setIsLoading(false);
          const { signer } = await getSigner();
          const address = await signer.getAddress();
          setAddress(address);
          const contract = new ethers.Contract(
            CoinFlipGameAddress,
            CoinFlipGameABI,
            signer
          );
          const username = await contract.usernameByAddress(address);
          if (!username) {
            setShowUsernameDialog(true);
          } else {
            setUsername(username);
            setLoggedIn(true);
            navigate("/gameHall");
          }
        } catch (error) {
          alert("Error connecting to MetaMask:" + error);
        }
      })();
    } else {
      setIsLoading(false);
      setAddress(null);
      setUsername(null);
      setLoggedIn(false);
    }
  }, [loggedIn, navigate, setAddress, setLoggedIn, setUsername]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
          <div className="flex flex-col items-center">
            <button
              onClick={handleLogin}
              className="bg-white hover:bg-opacity-60 text-blue-900 font-bold py-2 px-4 rounded shadow mt-60 transition duration-200 border border-blue-900 hover:border-opacity-60">
              Log in with with MetaMask
            </button>
          </div>

          <UsernameDialog
            open={showUsernameDialog}
            onSubmit={handleUsernameSubmit}
          />
        </div>
      )}
    </>
  );
};

export default Login;
