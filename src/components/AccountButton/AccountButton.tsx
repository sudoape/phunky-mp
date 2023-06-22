import { useWithdraw } from "../../contracts/contractUtil";
import { cryptoPhunksMarketAbi } from "../../contracts/abi/cryptoPhunksMarketABI";
import { useState } from "react";
import { paycMarketPlaceContractAddr } from "../../consts";
import ConnectButton from "../ConnectButton/ConnectButton";
import { Button, HStack } from "@chakra-ui/react";
import { useAccount, useContractRead } from "wagmi";
import { BigNumberish, ethers } from "ethers";
import { FaEthereum } from "react-icons/fa";

function AccountButton() {
  const { address, isConnected } = useAccount();
  const [withdrawAmt, setWithdrawAmt] = useState("0.0");
  const { isLoading, withdraw } = useWithdraw();

  useContractRead({
    address: paycMarketPlaceContractAddr,
    abi: cryptoPhunksMarketAbi,
    functionName: "pendingWithdrawals",
    enabled: isConnected,
    args: [address],
    onSuccess(data) {
      setWithdrawAmt(ethers.utils.formatEther(data as BigNumberish));
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <HStack spacing="3">
      <ConnectButton />
      {isConnected && (
        <Button
          variant="solid"
          isLoading={isLoading}
          leftIcon={<FaEthereum style={{ paddingBottom: "0.1rem" }} />}
          onClick={() => withdraw?.()}
          isDisabled={parseInt(withdrawAmt) == 0}>
          {withdrawAmt}
        </Button>
      )}
    </HStack>
  );
}

export default AccountButton;
