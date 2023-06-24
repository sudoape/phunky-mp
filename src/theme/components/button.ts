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

const pill = defineStyle((props: StyleFunctionProps) => ({
  ...theme.components.Button.variants?.solid(props),
  border: "1px",
  whiteSpace: "normal", // allow text to wrap
  borderColor: "#bfc500",
  borderRadius: "2rem",
  cursor: "pointer",
  color: "#bfc500 !important",
  bg: "black",
  fontSize: "0.8rem",
  fontWeight: "500",
  width: "100%",
  transition: "all 0.3s",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  _hover: { bg: "black" },
  _active: { bg: "#bfc500", color: "black !important" },
}));

export const PaycButton = defineStyleConfig({
  variants: { primary, pill },
  defaultProps: {
    variant: "primary",
  },
});
