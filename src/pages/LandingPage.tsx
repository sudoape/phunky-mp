import { Link as NavLink } from "react-router-dom";
import {
  Flex,
  Spacer,
  Image,
  Box,
  Grid,
  Text,
  Button,
  FlexProps,
  Container,
} from "@chakra-ui/react";
import { getThemeBgColor } from "../helpers/theme";
import { SocialLinks } from "../components/social-links";

const LandingPage = () => {
  // const containerPx = theme.components.Container.baseStyle.px;
  // get the bg color, and set the fadeout to it
  const themeBgColor = getThemeBgColor();
  return (
    <>
      <LandingPageHeader />
      <Box as="section">
        <Container maxW="100%" px={0}>
          <Box position="relative" maxH="480px" overflow="hidden">
            <video
              autoPlay
              muted
              loop
              style={{
                maxHeight: "580px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}>
              <source
                src="https://ik.imagekit.io/nldjkvbypwl/flipped_FNa-Twypl.mp4?updatedAt=1640903473924"
                type="video/mp4"
              />
            </video>
            {/* another box on top of the player for fadeout */}
            <Box
              width="100%"
              bgGradient={`linear(to-b, ${themeBgColor}, transparent 20%, transparent 80%, ${themeBgColor})`}
              position="absolute"
              top={0}
              bottom={0}
            />
            <WelcomeBox
              themeBgColor={themeBgColor}
              props={{ position: "absolute", right: 0, bottom: 0 }}
            />
          </Box>
          <Flex p="3rem 15px" justify="center" textAlign="center">
            A limitless NFT collection where the token itself doubles as a statement that we are
            sick
            <br />
            and tired of the red tape mentality perpetuated by the right facing Blue Chips.
          </Flex>
        </Container>
      </Box>
    </>
  );
};

const SocialContainer = () => (
  <Flex gap={3} align="flex-end">
    <Spacer />
    <SocialLinks />
  </Flex>
);

const LandingPageHeader = () => (
  <Grid templateColumns="repeat(3, 1fr)" px="6" my="6" zIndex={10}>
    <Box display="flex" justifyContent="center" gridColumn={2} zIndex={11}>
      <Image
        src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
        alt=""
        width="180px"
        objectFit="contain"
        marginBottom={-8}
      />
    </Box>
    <SocialContainer />
  </Grid>
);

const WelcomeBox = ({ themeBgColor, props }: { themeBgColor: string; props: FlexProps }) => (
  <Flex
    bg={themeBgColor}
    direction="column"
    align="flex-end"
    padding="2rem 2rem 1.5rem 5rem"
    width="400px"
    height="220px"
    justify="space-between"
    {...props}>
    <Text
      fontSize="1.7em"
      lineHeight="1.2"
      fontWeight="800"
      textTransform="uppercase"
      fontStyle="italic"
      textAlign="right">
      Welcome to the <br />
      Phunky ape <br />
      yacht club
    </Text>
    <NavLink to="/marketplace">
      <Button size="lg">Enter Marketplace</Button>
    </NavLink>
  </Flex>
);

export default LandingPage;
