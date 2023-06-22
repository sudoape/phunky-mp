import { StyleFunctionProps, theme, defineStyleConfig, defineStyle } from "@chakra-ui/react";

const primary = defineStyle((props: StyleFunctionProps) => ({
  ...theme.components.Button.variants?.solid(props),
  textTransform: "uppercase",
  fontWeight: "700",
  fontSize: "16",
  borderRadius: "8px",
  border: "0",
  padding: "5%",
  margin: "auto auto",
  transition: ".3s",
  _hover: { bg: "white" },
  color: "black",
}));

export const PaycButton = defineStyleConfig({
  variants: { primary },
  defaultProps: {
    variant: "primary",
  },
});
