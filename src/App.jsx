import styled from "@emotion/styled";
import React, { useReducer } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./style.css";

import MyCollection from "./pages/MyCollection/MyCollection";
import FAQ from "./pages/FAQ";
import LandingPage from "./pages/LandingPage";
import Marketplace from "./pages/Marketplace/Marketplace";
import NFTDetails from "./pages/NFTDetails";
import ScrollToTop from "./helpers/scrollToTop";
import { getInitialState, reducer } from "./reducer";

const App = ({ web3 }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  // TODO move this shit out to a util
  const addTxn = (txn) => {
    dispatch({ type: "ADD_TXN", value: txn });
  };

  const txnError = (txn) => {
    dispatch({ type: "ERROR_TXN", value: txn });
  };

  const txnSuccess = (txn) => {
    dispatch({ type: "SUCCESS_TXN", value: txn });
  };

  const removeTxn = (txn) => {
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
    <Layout>
      <HashRouter>
        <ScrollToTop>
          <Container>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/marketplace/*"
                element={<Marketplace web3={web3} delegate={delegate} />}
              />
              <Route
                path="/collection/*"
                element={<MyCollection web3={web3} delegate={delegate} />}
              />
              <Route path="/faq" element={<FAQ web3={web3} />} />
              <Route path="/details/:id" element={<NFTDetails web3={web3} />} />
            </Routes>
          </Container>
        </ScrollToTop>
      </HashRouter>
      <Footer />
    </Layout>
  );
};

const Layout = styled.div`
  height: 100vh;
  overflow: auto;
  background-color: black;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  display: block;
  min-height: 100%;
`;

const Footer = styled.footer`
  height: 15px;
  background: #bfc500;
`;

export default App;
