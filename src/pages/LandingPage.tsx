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
  Divider,
  keyframes,
} from "@chakra-ui/react";
import { getThemeBgColor } from "../helpers/theme";
import { SocialLinks } from "../components/social-links";
import { useEffect, useState } from "react";

const LandingPage = () => {
  // const containerPx = theme.components.Container.baseStyle.px;
  // get the bg color, and set the fadeout to it
  const themeBgColor = getThemeBgColor();

  // keep a state of the video to load the page only after it's loaded
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById("myVideo");
    videoElement?.addEventListener("loadeddata", handleVideoLoad);
    return () => {
      videoElement?.removeEventListener("loadeddata", handleVideoLoad);
    };
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <Container
      maxW={{ base: "100%", sm: "540px", md: "720px", lg: "960px", xl: "1140px" }}
      width="100%"
      px="15px"
      mx="auto"
      style={{
        opacity: videoLoaded ? 1 : 0,
        transition: "opacity 400ms ease 0s, transform 400ms ease 0s",
      }}>
      <Flex mx="-15px" flexWrap="wrap">
        <LandingPageHeader />
        <Box as="section">
          <Box maxW="100%" px={0}>
            <Box position="relative" width="100%">
              <video
                id="myVideo"
                autoPlay
                muted
                loop
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}>
                <source
                  src="https://ik.imagekit.io/nldjkvbypwl/flipped_FNa-Twypl.mp4?updatedAt=1640903473924"
                  type="video/mp4"
                />
              </video>
              <WelcomeBox
                themeBgColor={themeBgColor}
                props={{ position: { lg: "absolute" }, right: 0, bottom: 0 }}
              />
            </Box>
          </Box>
          <Flex p="3rem 15px" justify="right" textAlign="right">
            A limitless NFT collection where the token itself doubles as a statement that we are
            sick
            <br />
            and tired of the red tape mentality perpetuated by the right facing Blue Chips.
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

const SocialContainer = () => (
  <Flex gap={3} align="flex-end">
    <Spacer />
    <SocialLinks />
  </Flex>
);

const LandingPageHeader = () => (
  <Grid templateColumns="repeat(3, 1fr)" px="6" zIndex={10} width="100%">
    <Box display="flex" justifyContent="center" gridColumn={2} zIndex={11}>
      <Image
        src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
        alt=""
        width="180px"
        objectFit="contain"
        marginBottom={-10}
        paddingTop="1.5rem"
      />
    </Box>
    <SocialContainer />
  </Grid>
);

const blinker = keyframes`
  0% {
    color: white; // Initial color
  }
  50% {
    color: #686868; // Mid-animation color
  }
  100% {
    color: white; // Final color (same as initial color)
  }
`;

const WelcomeBox = ({ themeBgColor, props }: { themeBgColor: string; props: FlexProps }) => (
  <Grid
    bg={themeBgColor}
    templateColumns="24% 76%"
    gap="0"
    padding="1.5rem 0 0 0"
    alignItems="center"
    {...props}>
    <Box margin="auto">
      <Text
        fontWeight="500"
        lineHeight="0.6em"
        letterSpacing="0.05em"
        fontSize="0.7em"
        fontStyle="italic"
        transform="translateX(-10%) rotate(-90deg)"
        width="max-content"
        animation={`${blinker} 1.3s linear infinite`}>
        ← SCROLL DOWN
      </Text>
    </Box>
    <Box marginRight="1rem">
      <Text
        fontSize="1.7em"
        lineHeight="1.2"
        fontWeight="800"
        textTransform="uppercase"
        fontStyle="italic"
        textAlign="right"
        marginBottom="1rem">
        Welcome to <br />
        the Phunky ape <br />
        yacht club
      </Text>
      <NavLink to="/marketplace">
        <Button width="100%" height="3.5rem" marginBottom="1.5rem">
          Enter Marketplace
        </Button>
      </NavLink>
      <Divider opacity="1" bg="white"></Divider>
    </Box>
  </Grid>
);

export default LandingPage;
