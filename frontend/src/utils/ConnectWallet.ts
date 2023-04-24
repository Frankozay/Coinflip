import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export const getSigner = async () => {
  await window.ethereum?.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(
    window.ethereum as unknown as ethers.providers.ExternalProvider
  );
  const signer = provider.getSigner();
  return { provider, signer };
};
