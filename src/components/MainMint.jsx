import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import roboPunksNFT from "../RoboPunksNFT.json";

const roboPunksNFTAddress = "0x1DD4dE7Ce93f529AA6ab4cd50136d319E9aDe4aA";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1); //max = 3
  const isConnected = Boolean(accounts[0]);

  const handleMint = async () => {
    if (window.ethereum) {
      //provides a way for ethers to connect to Blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div>
      <h1>RoboPunks</h1>
      <p>
        It's 2078. Can the RoboPunks NFT save humans from destructive rampant
        NFT speculation? Mint RoboPunks to find out.
      </p>

      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type='number' value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <p>You must be connected to Mint.</p>
      )}
    </div>
  );
};

export default MainMint;
