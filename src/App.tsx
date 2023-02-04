import { useReducer } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import MyCollection from "./pages/MyCollection/MyCollection";
import FAQ from "./pages/FAQ";
import LandingPage from "./pages/LandingPage";
import Marketplace from "./pages/Marketplace/Marketplace";
import NFTDetails from "./pages/NFTDetails";
import ScrollToTop from "./helpers/scrollToTop";
import { getInitialState, reducer } from "./reducer";
import Web3 from "web3";
import { Txn } from "./types/types";
import Footer from "./components/footer";

const App = ({ web3 }: { web3: Web3 }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  // TODO move this shit out to a util
  const addTxn = (txn: Txn) => {
    dispatch({ type: "ADD_TXN", value: txn });
  };

  const txnError = (txn: Txn) => {
    dispatch({ type: "ERROR_TXN", value: txn });
  };

  const txnSuccess = (txn: Txn) => {
    dispatch({ type: "SUCCESS_TXN", value: txn });
  };

  const removeTxn = (txn: Txn) => {
    dispatch({ type: "REMOVE_TXN", value: txn });
  };

  const toggleTxnContainer = () => {
    dispatch({ type: "TOGGLE_TXN_LIST" });
  };

  const delegate = {
    txnsState: state,
    addTxn,
    txnError,
    txnSuccess,
    removeTxn,
    toggleTxnContainer,
  };

  return (
    <HashRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace/*" element={<Marketplace web3={web3} delegate={delegate} />} />
          <Route path="/collection/*" element={<MyCollection web3={web3} delegate={delegate} />} />
          <Route path="/faq" element={<FAQ web3={web3} />} />
          <Route path="/details/:id" element={<NFTDetails web3={web3} />} />
        </Routes>
      </ScrollToTop>
      <Footer paddingInline="1rem" />
    </HashRouter>
  );
};

export default App;
