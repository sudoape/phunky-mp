import {
  Text,
  Grid,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Image,
  Link,
  StackProps,
} from "@chakra-ui/react";
import { DiscordIcon, TwitterIcon } from "./icons";

const links = [
  {
    FooterIcon: DiscordIcon,
    label: "discord",
    href: "https://discord.com/invite/xkh9AEbgNH",
  },
  {
    FooterIcon: TwitterIcon,
    label: "twitter",
    href: "https://twitter.com/phunkyApeYC",
  },
];

type FooterLinkProps = {
  FooterIcon?: typeof Icon;
  href?: string;
  label?: string;
};

const FooterLink = ({ FooterIcon, href, label }: FooterLinkProps) => (
  <Link p="0.5rem" display="inline-block" href={href} aria-label={label} isExternal>
    <Icon as={FooterIcon} />
  </Link>
);

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
          {links.map((link) => {
            return <FooterLink key={link.href} {...link} />;
          })}
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
