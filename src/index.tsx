import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Web3 from "web3";
import { web3ProviderURL } from "./consts";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import Fonts from "./components/font-face";
import { WagmiConfig, createClient, configureChains, mainnet, goerli } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { InjectedConnector } from "wagmi/connectors/injected";

// TODO: completely replace this
const web3 = new Web3(web3ProviderURL);

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [
    alchemyProvider({ apiKey: web3ProviderURL.substring(web3ProviderURL.lastIndexOf("/") + 1) }),
    publicProvider(),
  ],
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

Sentry.init({
  dsn: "https://e79c03ee5546443993243b72dd081237@o4504510885527552.ingest.sentry.io/4504510899683328",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.5,
});

const root = createRoot(document.getElementById("root") as Element);
root.render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <WagmiConfig client={client}>
      <Fonts />
      <App web3={web3} />
    </WagmiConfig>
  </ChakraProvider>,
  // </React.StrictMode>,
);
