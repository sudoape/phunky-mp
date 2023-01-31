// 1. import `extendTheme` function
import { extendTheme, withDefaultColorScheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { ButtonProps } from "antd";

// TODO: Organize this better

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme(
  {
    config,
    semanticTokens: {
      colors: {
        "chakra-body-bg": { _light: "white", _dark: "#121619" },
      },
    },
    fonts: {
      heading: `'Montserrat', sans-serif`,
      body: `'Montserrat', sans-serif`,
    },
    components: {
      Button: {
        variants: {
          // Creating a primary variant from solid
          primary: (props: ButtonProps) => ({
            ...theme.components.Button.variants.solid(props),
            textTransform: "uppercase",
            fontWeight: "700",
            borderRadius: "8px",
          }),
        },
      },
    },
    // https://chakra-ui.com/docs/styled-system/advanced-theming
    // styles: {
    //   global: (props: StyleFunctionProps) => ({
    //     body: {
    //       // sets a custom bg color for dark mode only
    //       bg: mode(
    //         // light mode value retrieved from theme
    //         props.theme.semanticTokens.colors["chakra-body-bg"]._light,
    //         // your custom value for dark mode
    //         "#121619",
    //       )(props),
    //     },
    //   }),
    // },
    colors: {
      brand: {
        main: "#bfc500", // "#121619",
      },
      grey: {
        700: "#2D3748",
      },
      // "#bfc500",
    },
  },
  withDefaultColorScheme({ colorScheme: "yellow" }), // TODO: make brand colorscheme
);

export default theme;
