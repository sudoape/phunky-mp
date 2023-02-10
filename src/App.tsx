import { HashRouter, Route, Routes } from "react-router-dom";

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
      <Footer paddingInline="1rem" />
    </HashRouter>
  );
};

export default App;
