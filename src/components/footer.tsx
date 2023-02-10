import { Text, Grid, Flex, FlexProps, HStack, Image, StackProps } from "@chakra-ui/react";
import { SocialLinks } from "./social-links";

const FooterLogo = (props: FlexProps) => (
  <Flex {...props}>
    <Image
      src="https://ik.imagekit.io/nldjkvbypwl/payc_logo_Djgp2I0OZ8p.png?updatedAt=1640924429847"
      alt=""
      width="200px"
      height="auto"
      border="2px"
      borderColor="brand.main"
    />
  </Flex>
);

export const Footer = (props: StackProps) => (
  <>
    <Grid
      templateColumns="repeat(3, 1fr)"
      alignItems="center"
      p="3rem 0"
      borderTop="1px"
      borderTopColor="grey.700"
      marginTop="3rem"
      {...props}>
      <FooterLogo gridColumn={2} justify="center" />
      <Flex flexDir="column" boxSize="1fr" align="flex-end">
        <HStack py="0.6rem" justify="center">
          <SocialLinks />
        </HStack>
        <Text fontSize="0.65rem" color="yellow" textAlign="end">
          © 2023 NOT Yuga Labs LLC
        </Text>
      </Flex>
    </Grid>
    {/*<Box h="1rem" bg="brand.main" />*/}
  </>
);

export default Footer;
