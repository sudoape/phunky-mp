import {
  Text,
  Grid,
  Flex,
  FlexProps,
  HStack,
  Image,
  Container,
  Box,
  Divider,
} from "@chakra-ui/react";
import { SocialLinks } from "./social-links";

const FooterLogo = (props: FlexProps) => (
  <Flex {...props}>
    <Image
      src="https://ik.imagekit.io/nldjkvbypwl/payc_logo_Djgp2I0OZ8p.png?updatedAt=1640924429847"
      alt=""
      width="200px"
      height="auto"
    />
  </Flex>
);

export const Footer = () => (
  <Box p="0" position="absolute" bottom="0" width="100%">
    <Container maxWidth="90%">
      <Divider width="104%" marginLeft="-2%" opacity="1" bg="white"></Divider>
      <Text textAlign="center" paddingTop="1rem" fontSize="12">
        This website is <strong>not</strong> affiliated with Yuga Labs.
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" alignItems="center" p="25px 0" paddingInline="1rem">
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
    </Container>
    <Box h="15px" bg="brand.main" />
  </Box>
);

export default Footer;
