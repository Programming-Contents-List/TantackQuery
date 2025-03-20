import React, { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      on?: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

const WalletLogin: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = (await detectEthereumProvider()) as Window["ethereum"];

      if (provider) {
        const web3Instance = new Web3(
          provider as unknown as Web3["currentProvider"]
        );
        setWeb3(web3Instance);
      } else {
        setError("MetaMask 또는 Web3 지갑이 설치되어 있지 않습니다.");
      }
    };

    loadProvider();
  }, []);

  const connectWallet = async () => {
    if (!web3 || !window.ethereum) {
      setError("Web3가 초기화되지 않았습니다.");
      return;
    }

    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      setAccount(accounts[0]);
    } catch (err) {
      setError(`${(err as Error).message} : 지갑 연결이 거부되었습니다.`);
    }
  };

  return (
    <div>
      <h2>Web3.js 스마트 월렛 로그인</h2>
      {account ? (
        <p>지갑 주소: {account}</p>
      ) : (
        <button onClick={connectWallet}>지갑 연결</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WalletLogin;
