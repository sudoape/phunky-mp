import React, { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSubgraphData } from "../../hooks/useSubgraphData";
import { reducer, getInitialState } from "./MarketplaceReducer";

import Filter from "./Filter";
import CommonContainer from "../../uikit/CommonContainer/CommonContainer";
import Header from "../../components/Header/Header";
import NFTCard from "../../components/NFTCard/NFTCard";
import Spinners from "../../components/Spinners/Spinners";
import ConfettiContainer from "../../components/ConfettiContainer/ConfettiContainer";
import NFTLoadingCards from "../../components/NFTLoadingCards/NFTLoadingCards";
import { PillGroup } from "../../uikit/Pills/Pills";
import SortDropdown from "../../uikit/SortDropdown/SortDropdown";
import { ViewEnum } from "../../types/types";
import Web3 from "web3";
import BN from "bn.js";
import { Button, Flex, Grid } from "@chakra-ui/react";
import PageHeaderContainer from "../../components/PageHeaderContainer/PageHeaderContainer";

interface MarketplaceProps {
  web3: Web3;
}

function Marketplace({ web3 }: MarketplaceProps) {
  // example: logged to console the mock subgraph data on rinkeby
  const marketDataHook = useSubgraphData();
  // Filter Region
  const [state, dispatch] = useReducer(reducer, getInitialState());
  // Filter Region End
  // Forwarding to token details
  const navigate = useNavigate();
  const goToNFT = (tokenId: string) => {
    navigate(`/details/${tokenId}`);
  };

  // Toggle market view
  const onViewChange = (view: ViewEnum) => {
    dispatch({ type: "SET_VIEW", value: view });
  };

  // Used to trigger loading states.
  useEffect(() => {
    if (state.isFuseQueryLoading) {
      dispatch({ type: "SET_FUSE_DATA" });
    }
  }, [state.isFuseQueryLoading]);

  useEffect(() => {
    dispatch({ type: "SET_FUSE_QUERY_LOADING", value: false });
  }, [state.galleryData]);

  // Sorting
  const [selectedSort, setSelectedSort] = useState("price_asc");
  // useEffect(() => {}, [selectedSort]); // what is the point of this?

  // Set subgraph data to reducer
  useEffect(() => {
    if (marketDataHook.subgraphData.data) {
      dispatch({
        type: "SET_SUBGRAPH_DATA",
        value: marketDataHook.subgraphData,
      });
    }
  }, [marketDataHook.subgraphData]);

  return (
    <>
      {state.isPlayingConfetti ? <ConfettiContainer dispatch={dispatch} /> : null}
      {state.isGlobalLoadingStatus ? <Spinners /> : null}
      <Header />
      <CommonContainer>
        <PageHeaderContainer>
          Marketplace
          <Flex align="center" justify="space-between">
            <PillGroup>
              <Button
                variant="pill"
                isActive={state.selectedView === ViewEnum.ForSale}
                onClick={() => onViewChange(ViewEnum.ForSale)}>
                For Sale
              </Button>
              {/* <Pill
                active={state.selectedView === 'has_bids'}
                text="Has Bids"
                onClick={() => onViewChange('has_bids')}
              /> */}
              <Button
                variant="pill"
                isActive={state.selectedView === ViewEnum.ViewAll}
                onClick={() => onViewChange(ViewEnum.ViewAll)}>
                View All (limit 300)
              </Button>
            </PillGroup>
            <Flex>
              <SortDropdown selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            </Flex>
          </Flex>
        </PageHeaderContainer>
        <MarketPlaceContainer>
          <Filter state={state} dispatch={dispatch} />
          <GridContainer>
            {state.isFuseQueryLoading ? (
              <NFTLoadingCards />
            ) : (
              state.galleryData
                ?.slice(0, 300)
                ?.sort((a, b) => {
                  if (selectedSort === "price_asc") {
                    return new BN(a?.item?.minValue || "0").cmp(new BN(b?.item?.minValue || "0"));
                  } else if (selectedSort === "price_desc") {
                    return new BN(b?.item?.minValue || "0").cmp(new BN(a?.item?.minValue || "0"));
                  } else if (selectedSort === "recent") {
                    return (
                      parseInt(b?.item?.blockNumberListedForSale || "0") -
                      parseInt(a?.item?.blockNumberListedForSale || "0")
                    );
                  }
                  return 0;
                })
                ?.map((ape, index: string) => (
                  <NFTCard
                    nft={ape.item}
                    key={index}
                    web3={web3}
                    dispatch={dispatch}
                    onClick={() => goToNFT(ape.item.num.toString())}
                  />
                ))
            )}
          </GridContainer>
        </MarketPlaceContainer>
      </CommonContainer>
    </>
  );
}

interface MarketplaceContainerProps {
  children: React.ReactNode;
}

const MarketPlaceContainer = ({ children }: MarketplaceContainerProps) => (
  <Grid gridGap="1rem" gridTemplateColumns={{ base: "none", md: "3fr 9fr" }} paddingBottom="2rem">
    {children}
  </Grid>
);

interface GridContainerProps {
  children: React.ReactNode;
}

const GridContainer = ({ children }: GridContainerProps) => (
  <Grid
    gap="1.4rem"
    templateColumns="repeat(4, 1fr)"
    templateRows="auto auto 1fr"
    height="calc(100vh - 208px)"
    overflowY="scroll"
    css={{
      /* Hide scrollbar for Chrome, Safari and Opera */
      "&::-webkit-scrollbar": {
        display: "none",
      },
      /* Hide scrollbar for IE, Edge and Firefox */
      "&-ms-overflow-style": "none" /* IE and Edge */,
      "scrollbar-width": "none" /* Firefox */,
    }}>
    {children}
  </Grid>
);

export default Marketplace;
