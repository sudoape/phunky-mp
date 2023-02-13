import { getEllipsisTxt } from "../../helpers/formatters";
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
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { useEffect } from "react";

const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const toast = useToast();
  const bg = getThemeBgColor();

  useEffect(() => {
    if (error) {
      toast({
        title: "Oops, something went wrong...",
        description: (error as { message: string })?.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }, [error]);

  if (isConnected) {
    const blockie = makeBlockie(`${address}`);
    return (
      <Popover>
        <PopoverTrigger>
          <Button variant="unstyled" p="2" height="3rem">
            <Avatar src={ensAvatar ? ensAvatar : blockie} size="sm" />
          </Button>
        </PopoverTrigger>
        <PopoverContent bg={bg} width="14rem">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader display="flex" justifyContent="center">
            <Link href={`https://etherscan.io/address/${address}`} isExternal>
              {ensName ? address : getEllipsisTxt(`${address}`, 6)} <ExternalLinkIcon mx="2px" />
            </Link>
          </PopoverHeader>
          <PopoverBody display="flex" justifyContent="center">
            <Button variant="solid" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }

  // we only have one connector now (injected). This will need to change if we add more.
  const connector = connectors[0];
  return (
    <>
      <Button disabled={!connector.ready} onClick={() => connect({ connector })}>
        {isLoading && connector.id === pendingConnector?.id ? "Connecting..." : "Connect"}
      </Button>
    </>
  );
};

export default ConnectButton;
