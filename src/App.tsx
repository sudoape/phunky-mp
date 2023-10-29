import { Box } from "@chakra-ui/react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Web3 from "web3";
import Footer from "./components/footer";
import ScrollToTop from "./helpers/scrollToTop";
import FAQ from "./pages/FAQ";
import LandingPage from "./pages/LandingPage";
import Marketplace from "./pages/Marketplace/Marketplace";
import MyCollection from "./pages/MyCollection/MyCollection";
import NFTDetails from "./pages/NFTDetails";
import {
  addTxn,
  removeTxn,
  toggleTxnContainer,
  txnError,
  txnSuccess,
  useTxnState,
} from "./reducer";
import CommonContainer from "./uikit/CommonContainer/CommonContainer";

const App = ({ web3 }: { web3: Web3 }) => {
  const [state, dispatch] = useTxnState();

  const txnManager = {
    txnsState: state,
    addTxn: addTxn(dispatch),
    txnError: txnError(dispatch),
    txnSuccess: txnSuccess(dispatch),
    removeTxn: removeTxn(dispatch),
    toggleTxnContainer: toggleTxnContainer(dispatch),
  };

  return (
    <HashRouter>
      <Box
        className="app"
        minHeight="100vh"
        paddingBottom={{ base: "200px", sm: "250px", lg: "300px" }}>
        <CommonContainer props={{ maxW: "1200px", px: 0 }}>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/collection/*"
                element={<MyCollection web3={web3} delegate={txnManager} />}
              />
              <Route path="/faq" element={<FAQ web3={web3} />} />
              <Route path="/details/:id" element={<NFTDetails web3={web3} />} />
            </Routes>
          </ScrollToTop>
        </CommonContainer>
        {/* Marketplace page has a different container for more screen space */}
        <Routes>
          <Route path="/marketplace/*" element={<Marketplace web3={web3} />} />
        </Routes>
        <Footer />
      </Box>
    </HashRouter>
  );
};

export default App;
