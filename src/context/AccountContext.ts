import { createContext } from "react";

export interface AccountContextType {
  account: string;
  setAccount: (address: string) => void;
}

export const AccountContext = createContext<AccountContextType>({
  account: "0x0",
  setAccount: () => undefined,
});
