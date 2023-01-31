import ReactPlayer from "react-player";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Spacer, Image, Link, Box, Grid, Text, Button, FlexProps } from "@chakra-ui/react";
import { getThemeBgColor } from "../helpers/theme";
import { DiscordIcon, TwitterIcon } from "../components/icons";

const LandingPage = () => {
  // const containerPx = theme.components.Container.baseStyle.px;
  // get the bg color, and set the fadeout to it
  const themeBgColor = getThemeBgColor();
  return (
    <Flex direction="column" justify="center" mt={6} padding="0 2rem">
      <Header />
      <Flex position="relative" justify="center">
        <Box>
          <ReactPlayer
            playing
            loop
            muted
            url="https://ik.imagekit.io/nldjkvbypwl/flipped_FNa-Twypl.mp4?updatedAt=1640903473924"
            width="100%"
            height="auto"
          />
        </Box>
        {/* another box on top of the player for fadeout */}
        <Box
          width="100%"
          bgGradient={`linear(to-b, ${themeBgColor}, transparent 40%, transparent 70%, ${themeBgColor})`}
          position="absolute"
          top={0}
          bottom={0}
        />
        <WelcomeBox
          themeBgColor={themeBgColor}
          props={{ position: "absolute", right: 0, bottom: 0 }}
        />
      </Flex>
      <Box p="3rem 15px">
        A limitless NFT collection where the token itself doubles as a statement that we are sick
        <br />
        and tired of the red tape mentality perpetuated by the right facing Blue Chips.
      </Box>
    </Flex>
  );
};

const SocialContainer = () => (
  <Flex gap={3} align="flex-end">
    <Spacer />
    <Link href="https://discord.com/invite/xkh9AEbgNH" target="_blank">
      <DiscordIcon />
    </Link>
    <Link href="https://twitter.com/phunkyApeYC" target="_blank">
      <TwitterIcon />
    </Link>
  </Flex>
);

const Header = () => (
  <Grid templateColumns="repeat(3, 1fr)" zIndex={10}>
    <Box display="flex" justifyContent="center" gridColumn={2}>
      <Image
        src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
        alt=""
        width="180px"
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
    padding="24px 0 0 5rem"
    width="360px"
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
    <Spacer />
    <Button variant="primary" marginY={4} size="lg">
      <Link as={RouterLink} to="/marketplace" style={{ textDecoration: "none" }}>
        Enter Marketplace
      </Link>
    </Button>
  </Flex>
);

export default LandingPage;
