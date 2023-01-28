// 1. import `extendTheme` function
import { extendTheme, withDefaultColorScheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme(
  {
    config,
    fonts: {
      heading: `'Montserrat', sans-serif`,
      body: `'Montserrat', sans-serif`,
    },
    // styles: {
    //   global: (props: StyleFunctionProps) => ({
    //     body: {
    //       // sets a custom bg color for dark mode only
    //       bg: mode(
    //         // light mode value retrieved from theme
    //         props.theme.semanticTokens.colors["chakra-body-bg"]._light,
    //         // your custom value for dark mode
    //         "black",
    //       )(props),
    //     },
    //   }),
    // },
    colors: {
      brand: "#bfc500",
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" }),
);

export default theme;
