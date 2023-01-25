import styled from "@emotion/styled";
import { SecondaryButton } from "../../uikit/Buttons/Buttons";
import { withdraw } from "contracts/contractUtil";
import { cryptoPhunksMarketAbi } from "contracts/abi/cryptoPhunksMarketABI";
import { useEffect, useState } from "react";
import { paycMarketPlaceContractAddr } from "consts";
import { useContext } from "react";
import ConnectButton from "components/ConnectButton/ConnectButton";
import { AccountContext } from "context/AccountContext";

function AccountButton({ web3 }) {
  const { account } = useContext(AccountContext);
  const [withdrawAmt, setWithdrawAmt] = useState("");

  useEffect(() => {
    const updateWithdrawAmt = async () => {
      const contract = new web3.eth.Contract(cryptoPhunksMarketAbi, paycMarketPlaceContractAddr);
      const amt = await contract.methods.pendingWithdrawals(account).call();
      setWithdrawAmt(web3.utils.fromWei(amt, "ether") + " ≡");
    };
    if (account !== "0x0") {
      updateWithdrawAmt();
    }
  });

  return (
    <AccountContainer>
      <ConnectButton />
      <SecondaryButton
        text={`🚰 ${withdrawAmt}`}
        onClick={async () => await withdraw(web3)}></SecondaryButton>
    </AccountContainer>
  );
}

const AccountContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default AccountButton;
