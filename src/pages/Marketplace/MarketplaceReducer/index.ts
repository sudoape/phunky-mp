import Fuse from "fuse.js";
import { Reducer } from "react";
import { getApes, getAllApes, createNewFuseDbFromApeIds } from "../../../db";
import { SubgraphData } from "../../../hooks/useSubgraphData";
import {
  TraitEnum,
  SubgraphItem,
  ViewEnum,
  Item,
  SubgraphItemNormalized,
} from "../../../types/types";

export interface MarketplaceState {
  bg: string[];
  clothes: string[];
  earring: string[];
  eyes: string[];
  fur: string[];
  hat: string[];
  mouth: string[];
  id: string[];
  selectedFilter: string;
  selectorIsOpen: boolean;
  selectedView: ViewEnum;
  galleryData: Fuse.FuseResult<Item>[];
  isFuseQueryLoading: boolean;
  subgraphData: SubgraphData;
  phunkyApeListedDB: Fuse<Item> | null;
  phunkyApeBidsDB: Fuse<Item> | null;
  phunkyApeListed: Item[];
  phunkyApeBids: Item[];
  isGlobalLoadingStatus: boolean;
  isConfettiOn: boolean;
  hideFilters: boolean;
  isPlayingConfetti: boolean;
}

// FIXME: when changing view between 'For Sale' and 'View All'
// The filters are not applied until a new trait value is clicked
const initialState: MarketplaceState = {
  bg: [],
  clothes: [],
  earring: [],
  eyes: [],
  fur: [],
  hat: [],
  mouth: [],
  id: ["", "", "", ""],
  selectedFilter: "",
  selectorIsOpen: false,
  selectedView: ViewEnum.ForSale,
  galleryData: [],
  isFuseQueryLoading: false,
  subgraphData: { data: { phunkyApes: [], bids: [] } },
  phunkyApeListedDB: null,
  phunkyApeBidsDB: null,
  phunkyApeListed: [],
  phunkyApeBids: [],
  isGlobalLoadingStatus: false,
  isConfettiOn: false,
  hideFilters: false,
  isPlayingConfetti: false,
};

function getInitialState() {
  return initialState;
}

export type MarketplaceAction =
  | { type: "SELECT"; key: TraitEnum; value: string[] }
  | { type: "SET_ID_QUERY"; value: string; index: number }
  | { type: "TOGGLE_FILTER"; value: TraitEnum }
  | { type: "SET_VIEW"; value: ViewEnum }
  | { type: "SET_FUSE_DATA" }
  | { type: "SET_FUSE_QUERY_LOADING"; value: boolean }
  | { type: "RESET_ID_QUERY" }
  | { type: "SET_SUBGRAPH_DATA"; value: SubgraphData }
  | { type: "RESET" }
  | { type: "SET_GLOBAL_LOADING_STATUS"; value: boolean }
  | { type: "REMOVE_APE_FROM_LISTING_DB"; value: number }
  | { type: "TURN_CONFETTI_OFF" }
  | { type: "TOGGLE_HIDE_FILTERS" };

// Market Place Reducer
const reducer: Reducer<MarketplaceState, MarketplaceAction> = (state, action) => {
  switch (action.type) {
    case "SELECT": {
      return {
        ...state,
        [action.key]: action.value[0] !== "none" ? action.value : [], // FIXME
        selectedFilter: "",
        selectorIsOpen: false,
        isFuseQueryLoading: true,
      };
    }
    case "SET_ID_QUERY": {
      const currentIdQuery = state.id;
      currentIdQuery[action.index] = action.value;
      return { ...state, id: currentIdQuery };
    }
    case "TOGGLE_FILTER": {
      const isFilterValueDifferent = action.value !== state.selectedFilter;
      // Case a new header is selected
      if (isFilterValueDifferent) {
        return { ...state, selectorIsOpen: true, selectedFilter: action.value };
      } else {
        // Case same header is selected
        const nextOpenState = !state.selectorIsOpen;
        const filterValue = nextOpenState === true ? action.value : "";
        return {
          ...state,
          selectorIsOpen: nextOpenState,
          selectedFilter: filterValue,
        };
      }
    }
    case "SET_VIEW": {
      const newViewState = {
        ...state, // keep the filters when changing view
        phunkyApeListedDB: state.phunkyApeListedDB,
        phunkyApeBidsDB: state.phunkyApeBidsDB,
        selectedView: action.value,
        isFuseQueryLoading: true, // set to true to search based on state
      };

      return newViewState;
    }
    // TODO: something wrong here with the SubgraphItem vs Item. May use extend or smth for the type?
    //       Actually, is this even used outside of view all?
    case "SET_FUSE_DATA": {
      // respect the current view
      let apes = [];
      if (state.selectedView === ViewEnum.ForSale) {
        apes = getApes(state, state.phunkyApeListedDB, true);
      } else if (state.selectedView === ViewEnum.HasBids) {
        apes = getApes(state, state.phunkyApeBidsDB, true);
      } else {
        apes = getApes(state);
      }

      return {
        ...state,
        galleryData: apes,
      };
    }
    case "SET_FUSE_QUERY_LOADING":
      return {
        ...state,
        isFuseQueryLoading: action.value,
      };
    case "RESET_ID_QUERY":
      return {
        ...state,
        id: ["", "", "", ""],
      };
    case "SET_SUBGRAPH_DATA": {
      console.log(action.value.data);
      const apeListed = action.value.data.phunkyApes.map((ape) => {
        return normalizeApe(ape, true);
      });
      const apeBids = action.value.data.bids.map((bid) => {
        const ape = bid.phunkyApe;
        return normalizeApe(ape, true);
      });

      const listedDB = createNewFuseDbFromApeIds(apeListed);
      const bidsDB = createNewFuseDbFromApeIds(apeBids);

      console.log(listedDB);

      let nextDB = [];
      if (state.selectedView === ViewEnum.ForSale) {
        nextDB = listedDB.search("goat") || [];
      } else if (state.selectedView === ViewEnum.HasBids) {
        nextDB = bidsDB.search("goat") || [];
      } else {
        nextDB = getAllApes();
      }
      console.log(nextDB);
      return {
        ...state,
        phunkyApeListedDB: listedDB,
        phunkyApeBidsDB: bidsDB,
        phunkyApeListed: apeListed as Item[], // we need to keep a reference to the original for when we modify it and need to create a new instance of fuse
        phunkyApeBids: apeBids as Item[],
        galleryData: nextDB,
      };
    }
    case "RESET": {
      const gallery = state.phunkyApeListedDB?.search("goat") || [];
      const resetState = {
        ...initialState,
        phunkyApeListedDB: state.phunkyApeListedDB,
        phunkyApeBidsDB: state.phunkyApeBidsDB,
        phunkyApeListed: gallery.map((res) => res.item),
        phunkyApeBids: state.phunkyApeBidsDB?.search("goat").map((res) => res.item) || [],
        galleryData: gallery,
      };

      return resetState;
    }
    case "SET_GLOBAL_LOADING_STATUS":
      return {
        ...state,
        isGlobalLoadingStatus: action.value,
      };
    case "REMOVE_APE_FROM_LISTING_DB": {
      const listedDbAfterRemove = state.phunkyApeListed.filter((ape) => {
        const phunkyId = parseInt(ape.id);
        return phunkyId !== action.value;
      });
      const listedDbAfterRemoveDB = createNewFuseDbFromApeIds(listedDbAfterRemove);

      return {
        ...state,
        isGlobalLoadingStatus: false,
        isTxnSuccess: true,
        isPlayingConfetti: true,
        phunkyApeListedDB: listedDbAfterRemoveDB,
        phunkyApeListed: listedDbAfterRemove,
        galleryData: listedDbAfterRemoveDB.search("goat"),
      };
    }
    case "TURN_CONFETTI_OFF":
      return {
        ...state,
        isConfettiOn: false,
      };
    case "TOGGLE_HIDE_FILTERS":
      return {
        ...state,
        hideFilters: !state.hideFilters,
      };
    default:
      throw new Error();
  }
};

// TODO: ask 2PAYC to normalize data from graph
const normalizeApe = (ape: SubgraphItem, isHex: boolean): SubgraphItemNormalized => {
  let phunkyApeId;
  if (isHex) {
    phunkyApeId = parseInt(ape.id, 16);
  } else {
    phunkyApeId = parseInt(ape.id);
  }

  return { ...ape, phunkyApeId };
};

export { reducer, getInitialState };
