import { Flex, Grid, useMediaQuery, useTheme } from "@chakra-ui/react";

interface PageHeaderContainerProps {
  children: React.ReactNode;
}

// TODO: Make this less complicated
const PageHeaderContainer = ({ children }: PageHeaderContainerProps) => {
  const theme = useTheme();
  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);
  if (isMobile) {
    return (
      <Flex direction="column" textStyle="h2" px="1rem">
        {children}
      </Flex>
    );
  }

  // Use 1 fr which is small, so that the child 375px size is respected.
  return (
    <Grid gridTemplateColumns="1fr 9fr" gridGap="1rem" textStyle="h2" px="1rem">
      {children}
    </Grid>
  );
};

export default PageHeaderContainer;
