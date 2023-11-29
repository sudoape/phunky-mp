import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSubgraphData } from "../../hooks/useSubgraphData";
import { getInitialState, reducer } from "./MarketplaceReducer";

import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import BN from "bn.js";
import Web3 from "web3";
import ConfettiContainer from "../../components/ConfettiContainer/ConfettiContainer";
import Header from "../../components/Header/Header";
import NFTCard from "../../components/NFTCard/NFTCard";
import NFTLoadingCards from "../../components/NFTLoadingCards/NFTLoadingCards";
import PageHeaderContainer from "../../components/PageHeaderContainer/PageHeaderContainer";
import Spinners from "../../components/Spinners/Spinners";
import { ViewEnum } from "../../types/types";
import CommonContainer from "../../uikit/CommonContainer/CommonContainer";
import { PillGroup } from "../../uikit/Pills/Pills";
import SortDropdown from "../../uikit/SortDropdown/SortDropdown";
import Filter from "./Filter";
import { MobileFilterButton } from "../../components/mobile-filter";

interface MarketplaceProps {
  web3: Web3;
}

function Marketplace({ web3 }: MarketplaceProps) {
  // example: logged to console the mock subgraph data on rinkeby
  const marketDataHook = useSubgraphData();
  // Filter Region
  const [state, dispatch] = useReducer(reducer, getInitialState());
  // Initial number of items to display
  const [visibleItemsCount, setVisibleItemsCount] = useState(30); // Initial number of items to display

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
          <Box width="375px">Marketplace</Box>
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
                View All
              </Button>
            </PillGroup>
            <Flex>
              <SortDropdown selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            </Flex>
          </Flex>
        </PageHeaderContainer>
        <MarketPlaceContainer>
          <Filter
            state={state}
            dispatch={dispatch}
            props={{ display: { base: "none", lg: "flex" } }}
          />
          <GridContainer
            visibleItemsCount={visibleItemsCount}
            setVisibleItemsCount={setVisibleItemsCount}>
            {state.isFuseQueryLoading ? (
              <NFTLoadingCards />
            ) : (
              state.galleryData
                ?.slice(0, visibleItemsCount)
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
                ?.map((ape, index: number) => (
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
          <MobileFilterButton state={state} dispatch={dispatch} />
        </MarketPlaceContainer>
      </CommonContainer>
    </>
  );
}

interface MarketplaceContainerProps {
  children: React.ReactNode;
}

const MarketPlaceContainer = ({ children }: MarketplaceContainerProps) => (
  <Flex paddingBottom="1rem" flexDir="row" flexWrap={{ base: "wrap", md: "inherit" }}>
    {children}
  </Flex>
);

interface GridContainerProps {
  visibleItemsCount: number;
  setVisibleItemsCount: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}

const GridContainer = ({
  visibleItemsCount,
  setVisibleItemsCount,
  children,
}: GridContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Handles the scroll event and loads more items when the user has scrolled near the end of the container.
   */
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollHeight = container.scrollHeight;
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        // load more items when the user has scrolled 500 pixels from the end of the container
        if (scrollHeight - scrollTop <= clientHeight + 500) {
          // User has scrolled near the end of the container
          setVisibleItemsCount((prevCount) => prevCount + 20);
        }
      }
    };

    const gridContainer = containerRef.current;
    if (gridContainer) {
      gridContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (gridContainer) {
        gridContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visibleItemsCount]);

  return (
    <Grid
      ref={containerRef}
      gap="1.4rem"
      templateColumns={{
        base: "repeat(auto-fill, minmax(135px, 1fr))",
        lg: "repeat(auto-fill, minmax(220px, 1fr))",
      }}
      width="100%"
      templateRows="auto auto 1fr"
      height="calc(100vh - 160px)"
      overflowY="scroll"
      css={{
        paddingInlineEnd: "5px", // Adds space to the right of the content inside the grid container
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "grey",
          borderRadius: "24px",
        },
      }}>
      {children}
    </Grid>
  );
};

export default Marketplace;
