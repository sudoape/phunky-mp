import {
  Button,
  chakra,
  Flex,
  HStack,
  HTMLChakraProps,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AccountButton from "../AccountButton/AccountButton";
import { MobileNavButton } from "../mobile-nav";

interface MainNavLinkProps {
  href: string;
  label?: string;
}

// TODO: replace white with theme specific color
const MainNavLink = ({ href, label }: MainNavLinkProps) => {
  const location = useLocation();
  const active = location.pathname.startsWith(href);

  return (
    <NavLink to={href}>
      <Button
        px="0.5rem"
        m="10px"
        h={12}
        variant="link"
        color="white"
        borderRadius={active ? "2px 2px 0px 0px" : "2px"}
        borderBottomWidth="2px"
        borderBottomColor={active ? "white" : "transparent"}
        borderBottomStyle="solid"
        fontSize="8px"
        fontStyle="italic"
        fontWeight="500"
        letterSpacing="1.2px"
        textAlign="end"
        textTransform="uppercase"
        _hover={{ color: "brand.main", borderBottomColor: active ? "brand.main" : "transparent" }}>
        {label}
      </Button>
    </NavLink>
  );
};

const HeaderContent = () => {
  return (
    <>
      <Flex id="nav" w="100%" h="100%" my="0.5rem" align="center" justify="space-between">
        <Flex align="center">
          <Link as={NavLink} to="/" display="block" aria-label="Back to homepage">
            <Image
              src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
              alt=""
              py="0.3rem"
              style={{ width: "120px", height: "auto" }}
            />
          </Link>
        </Flex>
        <Flex justify="flex-end" w="100%" align="center" color="gray.400" maxW="1100px">
          <HStack spacing="0" display={{ base: "none", md: "flex" }}>
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
      px={{ base: "1rem", sm: "3rem", lg: "5rem" }}
      height="4.5rem"
      mx="auto"
      {...props}>
      <HeaderContent />
    </chakra.header>
  );
}

export default Header;
