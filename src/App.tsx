import { HashRouter, Route, Routes } from "react-router-dom";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";

import MyCollection from "./pages/MyCollection/MyCollection";
import FAQ from "./pages/FAQ";
import LandingPage from "./pages/LandingPage";
import Marketplace from "./pages/Marketplace/Marketplace";
import NFTDetails from "./pages/NFTDetails";
import ScrollToTop from "./helpers/scrollToTop";
import Web3 from "web3";
import Footer from "./components/footer";
import {
  addTxn,
  removeTxn,
  toggleTxnContainer,
  txnError,
  txnSuccess,
  useTxnState,
} from "./reducer";

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
        position="relative"
        paddingBottom={{ base: "200px", sm: "250px", lg: "300px" }}>
        <Container maxW="1200px" marginLeft="auto" marginRight="auto" paddingInline="0">
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/marketplace/*" element={<Marketplace web3={web3} />} />
              <Route
                path="/collection/*"
                element={<MyCollection web3={web3} delegate={txnManager} />}
              />
              <Route path="/faq" element={<FAQ web3={web3} />} />
              <Route path="/details/:id" element={<NFTDetails web3={web3} />} />
            </Routes>
          </ScrollToTop>
        </Container>
        <Footer />
      </Box>
    </HashRouter>
  );
};

export default App;
