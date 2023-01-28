import { Txn } from "./types/types";

interface State {
  isConfettiOn: boolean;
  isTxnListOpen: boolean;
  txns: Txn[];
}

const initialState = {
  isConfettiOn: false,
  isTxnListOpen: false,
  txns: [],
};

type ACTIONTYPE =
  | { type: "SET_GLOBAL_LOADING_STATUS"; value: boolean }
  | { type: "ADD_TXN"; value: Txn }
  | { type: "ERROR_TXN"; value: Txn }
  | { type: "SUCCESS_TXN"; value: Txn }
  | { type: "REMOVE_TXN"; value: Txn }
  | { type: "TOGGLE_TXN_LIST" };

function reducer(state: State, action: ACTIONTYPE) {
  switch (action.type) {
    case "SET_GLOBAL_LOADING_STATUS":
      return { ...state, isGlobalLoadingStatus: action.value };
    case "ADD_TXN":
      return { ...state, txns: [...state.txns, action.value] };
    case "ERROR_TXN":
      console.log("error txn");
      return { ...state };
    case "SUCCESS_TXN":
      return {
        ...state,
        txns: state.txns.map((txn) => {
          if (txn.id === action.value.id) {
            return action.value;
          } else {
            return txn;
          }
        }),
      };
    case "REMOVE_TXN":
      return {
        ...state,
        txns: state.txns.filter((txn) => txn.id !== action.value.id),
      };
    case "TOGGLE_TXN_LIST":
      return { ...state, isTxnListOpen: !state.isTxnListOpen };
    default:
      throw new Error();
  }
}

function getInitialState() {
  return initialState;
}

export { reducer, getInitialState };
