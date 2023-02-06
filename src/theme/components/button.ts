import { StyleFunctionProps, theme, defineStyleConfig, defineStyle } from "@chakra-ui/react";

const primary = defineStyle((props: StyleFunctionProps) => ({
  ...theme.components.Button.variants?.solid(props),
  textTransform: "uppercase",
  fontWeight: "700",
  borderRadius: "8px",
}));

export const Button = defineStyleConfig({
  variants: { primary },
  defaultProps: {
    variant: "primary",
    size: "md",
    colorScheme: "gray",
  },
});
