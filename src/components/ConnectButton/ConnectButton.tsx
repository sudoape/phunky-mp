import React, { useContext } from "react";
import { getEllipsisTxt } from "../../helpers/formatters";
import { AccountContext } from "../../context/AccountContext";
import { handleAccountDisconnect, handleConnect } from "../../helpers/metamask";
import {
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  Avatar,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Link,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import makeBlockie from "ethereum-blockies-base64";
import { getThemeBgColor } from "../../helpers/theme";

const ConnectButton = () => {
  const { account, setAccount } = useContext(AccountContext);
  const toast = useToast();
  if (account !== "0x0") {
    const blockie = makeBlockie(account);
    return (
      <Popover>
        <PopoverTrigger>
          <Button variant="unstyled" p="2" height="3rem">
            <Avatar src={blockie} size="sm"></Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent bg={getThemeBgColor()} width="14rem">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader display="flex" justifyContent="center">
            <Link href={`https://etherscan.io/address/${account}`} isExternal>
              {getEllipsisTxt(account, 6)} <ExternalLinkIcon mx="2px" />
            </Link>
          </PopoverHeader>
          <PopoverBody display="flex" justifyContent="center">
            <Button
              variant="solid"
              onClick={() => {
                handleAccountDisconnect(setAccount);
              }}>
              Disconnect
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <Button
        onClick={() => {
          handleConnect(account, setAccount, toast);
        }}>
        Connect
      </Button>
    );
  }
};

export default ConnectButton;
