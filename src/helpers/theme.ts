import { useTheme, useColorMode } from "@chakra-ui/react";

export const getThemeBgColor = (): string => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const color =
    colorMode === "dark"
      ? theme.semanticTokens.colors["chakra-body-bg"]._dark
      : theme.semanticTokens.colors["chakra-body-bg"]._light;
  return color;
};

export const getThemeTextColor = (): string => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const color =
    colorMode === "dark"
      ? theme.semanticTokens.colors["chakra-body-text"]._dark
      : theme.semanticTokens.colors["chakra-body-text"]._light;
  return color;
};
