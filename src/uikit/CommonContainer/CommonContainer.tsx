import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface CommonContainerProps {
  children: ReactNode;
}

const CommonContainer = ({ children }: CommonContainerProps) => {
  return (
    <Box width="100%" maxW="1200px" mx="auto" px="2rem">
      {children}
    </Box>
  );
};

export default CommonContainer;
