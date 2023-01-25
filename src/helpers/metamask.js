function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts, account, setAccount) {
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

function handleAccountDisconnect(setAccount) {
  setAccount("0x0");
}

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
function handleConnect(currentAccount, setCurrentAccount) {
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((accounts) => handleAccountsChanged(accounts, currentAccount, setCurrentAccount))
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    });
}

export { handleChainChanged, handleAccountsChanged, handleAccountDisconnect, handleConnect };
