import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  IconButton,
  IconButtonProps,
  Link,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { getThemeBgColor } from "../helpers/theme";
import { SocialLinks } from "./social-links";
import { BsShopWindow, BsCollection, BsQuestionSquare } from "react-icons/bs";
import { TfiAngleRight } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

const pageLinks = [
  {
    desc: "Marketplace",
    href: "/marketplace",
    leftIcon: BsShopWindow,
  },
  {
    desc: "My Collection",
    href: "/collection",
    leftIcon: BsCollection,
  },
  {
    desc: "FAQ",
    href: "/faq",
    leftIcon: BsQuestionSquare,
  },
];

const MobileNavDrawerBody = () => {
  return (
    <VStack gap={4}>
      {pageLinks.map((link) => {
        return (
          <Link
            as={NavLink}
            to={link.href}
            key={link.href}
            _hover={{ textDecoration: "none" }}
            width="100%">
            <Button
              height={14}
              width="100%"
              variant="outline"
              rightIcon={<TfiAngleRight />}
              justifyContent="space-between">
              {/* Instead of using leftIcon, we use an Hstack with 
                      the left Icon and the description to move them both left */}
              <HStack gap={2}>
                <link.leftIcon />
                <Text color="inherit" fontWeight="light">
                  {link.desc}
                </Text>
              </HStack>
            </Button>
          </Link>
        );
      })}
    </VStack>
  );
};

export const MobileNavButton = (props: IconButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const bg = getThemeBgColor();
  return (
    <>
      <IconButton
        ref={btnRef}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        icon={<AiOutlineMenu />}
        {...props}></IconButton>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
        preserveScrollBarGap>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerHeader paddingBottom={12} />
          <DrawerBody>
            <MobileNavDrawerBody />
          </DrawerBody>
          <DrawerFooter justifyContent="center" gap="1rem">
            <SocialLinks />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
