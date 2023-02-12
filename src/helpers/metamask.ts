import { CreateToastFnReturn } from "@chakra-ui/react";

function handleChainChanged() {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(
  accounts: string[],
  account: string,
  setAccount: (address: string) => void,
) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log("Please connect to MetaMask.");
    setAccount("0x0");
  } else if (accounts[0] !== account) {
    account = accounts[0];
    // Do any other work!
    setAccount(account);
  }
}

// Metamask doesn't actually support disconnect. (Literally why?)
// TODO: replace with a package that supports disconnect.
function handleAccountDisconnect(setAccount: (address: string) => void) {
  setAccount("0x0");
}

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
function handleConnect(
  currentAccount: string,
  setCurrentAccount: (address: string) => void,
  toast: CreateToastFnReturn,
) {
  if (!window.ethereum) {
    // Nothing to do here... no ethereum provider found
    console.log("Metamask not installed");
    return;
  }
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts: string[]) =>
      handleAccountsChanged(accounts, currentAccount, setCurrentAccount),
    )
    .catch((err) => {
      toast({
        title: "Oops, something went wrong...",
        description: (err as { message: string })?.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    });
}

export { handleChainChanged, handleAccountsChanged, handleAccountDisconnect, handleConnect };
