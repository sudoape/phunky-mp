import React, { useContext } from "react";
import { getEllipsisTxt } from "helpers/formatters";
import { AccountContext } from "context/AccountContext";
import { handleConnect } from "helpers/metamask";
import PrimaryButton from "uikit/Buttons/Buttons";

const ConnectButton = () => {
  const { account, setAccount } = useContext(AccountContext);
  if (account !== "0x0") {
    return <PrimaryButton onClick={() => {}} text={getEllipsisTxt(account, 4)}></PrimaryButton>;
  } else {
    return (
      <PrimaryButton
        onClick={() => handleConnect(account, setAccount)}
        text="Connect"></PrimaryButton>
    );
  }
};

export default ConnectButton;
