// theme/index.js
import { extendTheme, withDefaultColorScheme, ThemeConfig } from "@chakra-ui/react";
import { colors } from "./colors";

// Component style overrides
import { PaycButton } from "./components/button";
import { semanticTokens } from "./semantic-tokens";

// color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  // foundational style overrides go here
  // styles,
  // borders,
  // component overrides
  semanticTokens,
  colors,
  components: {
    Button: PaycButton,
  },
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },
};

export default extendTheme(overrides, withDefaultColorScheme({ colorScheme: "brand" }));
