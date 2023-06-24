import { Flex, Grid, useBreakpointValue } from "@chakra-ui/react";

interface PageHeaderContainerProps {
  children: React.ReactNode;
}

const PageHeaderContainer = ({ children }: PageHeaderContainerProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Flex direction="column" textStyle="h2">
        {children}
      </Flex>
    );
  }

  return (
    <Grid gridTemplateColumns="3fr 9fr" gridGap="1rem" textStyle="h2">
      {children}
    </Grid>
  );
};

export default PageHeaderContainer;
