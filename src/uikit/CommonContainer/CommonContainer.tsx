import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CommonContainerProps {
  props?: BoxProps;
  children: ReactNode;
}

const CommonContainer = ({ props, children }: CommonContainerProps) => {
  return (
    <Box width="100%" mx="auto" px={{ base: "1rem", sm: "2rem", "2xl": "3rem" }} {...props}>
      {children}
    </Box>
  );
};

export default CommonContainer;
