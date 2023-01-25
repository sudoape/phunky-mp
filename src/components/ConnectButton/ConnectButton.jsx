import React, { useCallback, useContext } from "react";
import { getEllipsisTxt } from "helpers/formatters";
import { AccountContext } from "context/AccountContext";
import { handleConnect } from "helpers/metamask";
import PrimaryButton from "uikit/Buttons/Buttons";

const ConnectButton = (text = "Connect") => {
  const { account, setAccount } = useContext(AccountContext);
  const connect = useCallback(() => {
    const metamaskConnect = async () => {
      if (!window.ethereum) {
        // Nothing to do here... no ethereum provider found
        console.log("Metamask not installed");
        return;
      }
      await handleConnect(account, setAccount);
    };
    metamaskConnect();
  }, []);
  if (account !== "0x0") {
    return <PrimaryButton onClick={() => {}} text={getEllipsisTxt(account, 4)}></PrimaryButton>;
  } else {
    return <PrimaryButton onClick={connect} text="Connect"></PrimaryButton>;
  }
};

export default ConnectButton;
