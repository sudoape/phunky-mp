import React, { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSubgraphData } from "../../hooks/useSubgraphData";
import { reducer, getInitialState } from "./MarketplaceReducer";
import styled from "@emotion/styled";

import Filter from "./Filter";
import CommonContainer from "../../uikit/CommonContainer/CommonContainer";
import Header from "../../components/Header/Header";
import PageTitle from "../../uikit/PageTitle/PageTitle";
import NFTCard from "../../components/NFTCard/NFTCard";
import Spinners from "../../components/Spinners/Spinners";
import ConfettiContainer from "../../components/ConfettiContainer/ConfettiContainer";
import NFTLoadingCards from "../../components/NFTLoadingCards/NFTLoadingCards";
import { PillGroup, Pill } from "../../uikit/Pills/Pills";
import SortDropdown from "../../uikit/SortDropdown/SortDropdown";
import { ViewEnum } from "../../types/types";
import Web3 from "web3";
import BN from "bn.js";
import { Flex } from "@chakra-ui/react";

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
          <PageTitle title="Marketplace" />
          <Flex align="center" justify="space-between">
            <PillGroup>
              <Pill
                active={state.selectedView === ViewEnum.ForSale}
                text="For Sale"
                onClick={() => onViewChange(ViewEnum.ForSale)}
              />
              {/* <Pill
                active={state.selectedView === 'has_bids'}
                text="Has Bids"
                onClick={() => onViewChange('has_bids')}
              /> */}
              <Pill
                active={state.selectedView === ViewEnum.ViewAll}
                text="View All (limit 300)"
                onClick={() => onViewChange(ViewEnum.ViewAll)}
              />
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
                    onClick={() => goToNFT(ape.item.num)}
                  />
                ))
            )}
          </GridContainer>
        </MarketPlaceContainer>
      </CommonContainer>
    </>
  );
}

const mobileWidth = 700;

const PageHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
  grid-gap: 1rem;

  h1 {
    color: white;
    margin: 0 20px;
  }

  @media (max-width: ${mobileWidth}px) {
    display: flex;
    flex-direction: column;
  }
`;

const MarketPlaceContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 3fr 9fr;
  padding-bottom: 2rem;
  @media (max-width: ${mobileWidth}px) {
    grid-template-columns: none;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 1.4rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto 1fr;
  height: calc(100vh - 208px);
  overflow-y: scroll;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Marketplace;
