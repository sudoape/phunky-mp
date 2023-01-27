import { createContext } from "react";

export const AccountContext = createContext({
  account: "0x0",
  setAccount: (account: string) => {
    account;
  },
});
