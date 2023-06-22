import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  HTMLChakraProps,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useScroll } from "framer-motion";
import AccountButton from "./AccountButton/AccountButton";
import { MobileNavButton } from "./mobile-nav";
import { getThemeTextColor } from "../helpers/theme";

interface MainNavLinkProps {
  href: string;
  label?: string;
}

// TODO: replace white with theme specific color
const MainNavLink = ({ href, label }: MainNavLinkProps) => {
  const location = useLocation();
  const active = location.pathname.startsWith(href);
  const textColor = getThemeTextColor();

  return (
    <NavLink to={href}>
      <Button
        h={12}
        variant="ghost"
        // colorScheme="grey"
        color={active ? textColor : "grey.400"}
        borderRadius={active ? "4px 4px 0px 0px" : "4px"}
        borderBottomWidth="2px"
        borderBottomColor={active ? "white" : "transparent"}
        borderBottomStyle="solid">
        {label}
      </Button>
    </NavLink>
  );
};

const HeaderContent = () => {
  return (
    <>
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <Link as={NavLink} to="/" display="block" aria-label="Back to homepage">
            <Image
              src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
              alt=""
              style={{ width: "80px", height: "auto" }}
            />
          </Link>
        </Flex>
        <Flex justify="flex-end" w="100%" align="center" color="gray.400" maxW="1100px">
          <HStack spacing="4" display={{ base: "none", md: "flex" }}>
            <MainNavLink href="/marketplace" label="Marketplace" />
            <MainNavLink href="/collection" label="My Collection" />
            <MainNavLink href="/faq" label="FAQ" />
          </HStack>
          <Flex marginLeft={8}>
            <AccountButton />
          </Flex>
          <MobileNavButton aria-label="Mobile Menu" marginInlineStart="1rem" />
        </Flex>
      </Flex>
    </>
  );
};

function Header(props: HTMLChakraProps<"header">) {
  const { maxW = "8xl", maxWidth = "8xl" } = props;
  const ref = useRef<HTMLHeadingElement>(null);
  const [y, setY] = useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useScroll();
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? "sm" : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="0"
      zIndex="3"
      bg={useColorModeValue("white", "black")}
      left="0"
      right="0"
      width="full"
      {...props}>
      <Box height="4.5rem" mx="auto" maxW={maxW} maxWidth={maxWidth}>
        <HeaderContent />
      </Box>
    </chakra.header>
  );
}

export default Header;
