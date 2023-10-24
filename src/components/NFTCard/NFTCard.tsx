import BN from "bn.js";
import { buyPhunkyApe } from "../../contracts/contractUtil";
import fallbackImg from "../../helpers/fallbackImg";
import { Item } from "../../types/types";
import { MarketplaceAction } from "pages/Marketplace/MarketplaceReducer";
import Web3 from "web3";
import { MouseEventHandler, useState } from "react";
import { Box, Flex, Skeleton, Text, Image } from "@chakra-ui/react";

type PartialItem = Partial<Item>;

interface NFTCardProps {
  nft: PartialItem;
  onClick: MouseEventHandler<HTMLDivElement>;
  isLoading?: boolean | null;
  web3?: Web3;
  dispatch?: React.Dispatch<MarketplaceAction>;
  // bids?: any;
  disableBuyButton?: boolean;
  enableMyOffer?: boolean;
}

// TODO: replace web3 prop with wagmi?
const NFTCard = ({
  nft,
  onClick,
  isLoading = null,
  web3,
  dispatch,
  // bids = null,
  disableBuyButton = false,
  enableMyOffer = false,
}: NFTCardProps) => {
  const imgLocation =
    "https://ipfs.io/ipfs/bafybeifvc46kjao4mmdyqozoazvjhqfueaowbzjystkschwf4navb2ohva/" +
    nft.num +
    ".png";
  const [imgLoaded, setImgLoaded] = useState(false);

  // min value comes in wei so we need to convert it into a Big Number and then to ETH for
  // display but keep the wei value for when we make the transctions to the contracts
  let maxBid = new BN("0");
  // let bidTag = <p></p>;
  if (nft.phunkyApeBids && nft.phunkyApeBids.length) {
    for (let i = 0; i < nft.phunkyApeBids.length; i++) {
      const currentBid = new BN(nft.phunkyApeBids[i].bidAmount);
      if (currentBid.gt(maxBid)) {
        maxBid = currentBid;
      }
    }
  }
  const bidTag = (
    <Box fontSize="12px">
      Highest Offer:{" "}
      {nft.phunkyApeBids && nft.phunkyApeBids.length
        ? web3.utils.fromWei(maxBid.toString(), "ether")
        : "-"}
    </Box>
  );

  if (!nft.minValue) {
    nft.minValue = "0";
  }
  const price = new BN(nft.minValue);
  const ethPrice = web3 !== undefined ? web3.utils.fromWei(price, "ether") : "";

  let bidEthPrice = "";
  if (nft.bidAmount) {
    const bid = new BN(nft.bidAmount);
    bidEthPrice = web3.utils.fromWei(bid, "ether");
  }

  const handlePhunkyApeBuy = () => {
    dispatch({ type: "SET_GLOBAL_LOADING_STATUS", value: true });
    buyPhunkyApe(
      nft,
      nft.phunkyApeId,
      web3,
      () => {
        dispatch({ type: "REMOVE_APE_FROM_LISTING_DB", value: nft.num });
      },
      () => {
        dispatch({ type: "SET_GLOBAL_LOADING_STATUS", value: false });
      },
      false,
    );
  };

  return (
    <Card>
      <Clickable onClick={onClick}>
        <Skeleton isLoaded={!isLoading && imgLoaded} width="100%" height="100%" aspectRatio={1}>
          <Image
            src={imgLocation || "error"}
            fallbackSrc={fallbackImg}
            fallbackStrategy="onError"
            onLoad={() => setImgLoaded(true)}
            style={{ borderRadius: "12px" }}
          />
        </Skeleton>
      </Clickable>
      <CardInfo>
        <Skeleton isLoaded={!isLoading} maxW={isLoading ? "6rem" : "auto"}>
          <CardTitle>PAYC #{nft.num}</CardTitle>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} maxW={isLoading ? "5rem" : "auto"}>
          {nft.isForSale ? (
            <CardPrice>
              {ethPrice} Ξ
              {!disableBuyButton ?? <BuyNow onClick={handlePhunkyApeBuy}>Buy Now</BuyNow>}
            </CardPrice>
          ) : (
            <CardPrice>Unlisted</CardPrice>
          )}
        </Skeleton>
        <Skeleton isLoaded={!isLoading} maxW={isLoading ? "6rem" : "auto"}>
          {enableMyOffer ? <CardPrice>My Offer {bidEthPrice} Ξ</CardPrice> : null}
        </Skeleton>
        <Skeleton isLoaded={!isLoading} maxW={isLoading ? "6rem" : "auto"}>
          {bidTag}
        </Skeleton>
      </CardInfo>
    </Card>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box
    width="100%"
    display="flex"
    flexDirection="column"
    border="1px solid #4c4c4c"
    borderRadius="12px">
    {children}
  </Box>
);

interface ClickableProps {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Clickable = ({ children, onClick }: ClickableProps) => (
  <Box cursor="pointer" onClick={onClick}>
    {children}
  </Box>
);

const CardInfo = ({ children }: { children: React.ReactNode }) => (
  <Flex
    paddingInlineStart="0.5rem"
    paddingInlineEnd="0.5rem"
    marginTop="0.5rem"
    marginBottom="0.5rem"
    gap="0.5rem"
    flexDir="column">
    {children}
  </Flex>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <Text color="lightslategray">{children}</Text>
);

const CardPrice = ({ children }: { children: React.ReactNode }) => (
  <Flex fontSize="1.1rem" fontWeight="500" alignItems="center" justifyContent="space-between">
    {children}
  </Flex>
);

interface BuyNowProps {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const BuyNow = ({ children, onClick }: BuyNowProps) => (
  <Text color="cornflowerblue" cursor="pointer" fontSize="0.9rem" onClick={onClick}>
    {children}
  </Text>
);

export default NFTCard;
