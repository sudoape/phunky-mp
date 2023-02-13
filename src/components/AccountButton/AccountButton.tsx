import { withdraw } from "../../contracts/contractUtil";
import { cryptoPhunksMarketAbi } from "../../contracts/abi/cryptoPhunksMarketABI";
import { useState } from "react";
import { paycMarketPlaceContractAddr } from "../../consts";
import ConnectButton from "../ConnectButton/ConnectButton";
import { Button, HStack } from "@chakra-ui/react";
import { useAccount, useContractRead } from "wagmi";
import { BigNumberish, ethers } from "ethers";
import Web3 from "web3";

function AccountButton({ web3 }: { web3: Web3 }) {
  const { address, isConnected } = useAccount();
  const [withdrawAmt, setWithdrawAmt] = useState("");

  useContractRead({
    address: paycMarketPlaceContractAddr,
    abi: cryptoPhunksMarketAbi,
    functionName: "pendingWithdrawals",
    enabled: isConnected,
    args: [address],
    onSuccess(data) {
      setWithdrawAmt(ethers.utils.formatEther(data as BigNumberish) + " ≡");
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <HStack spacing="3">
      <ConnectButton />
      {isConnected && <Button onClick={async () => await withdraw(web3)}>🚰 {withdrawAmt}</Button>}
    </HStack>
  );
}

export default AccountButton;
