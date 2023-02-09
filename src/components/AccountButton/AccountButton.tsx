import { withdraw } from "../../contracts/contractUtil";
import { cryptoPhunksMarketAbi } from "../../contracts/abi/cryptoPhunksMarketABI";
import { useEffect, useState } from "react";
import { paycMarketPlaceContractAddr } from "../../consts";
import { useContext } from "react";
import ConnectButton from "../ConnectButton/ConnectButton";
import { AccountContext } from "../../context/AccountContext";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import { Button, HStack } from "@chakra-ui/react";

function AccountButton({ web3 }: { web3: Web3 }) {
  const { account } = useContext(AccountContext);
  const [withdrawAmt, setWithdrawAmt] = useState("");

  useEffect(() => {
    const updateWithdrawAmt = async () => {
      const contract = new web3.eth.Contract(
        cryptoPhunksMarketAbi as AbiItem[],
        paycMarketPlaceContractAddr,
      );
      const amt = await contract.methods.pendingWithdrawals(account).call();
      setWithdrawAmt(web3.utils.fromWei(amt, "ether") + " ≡");
    };
    if (account !== "0x0") {
      updateWithdrawAmt();
    }
  });

  return (
    <HStack spacing="5">
      <ConnectButton />
      <Button onClick={async () => await withdraw(web3)}>🚰 {withdrawAmt}</Button>
    </HStack>
  );
}

export default AccountButton;
