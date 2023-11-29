import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { getThemeBgColor } from "../helpers/theme";
import Filter, { onClearFilters } from "../pages/Marketplace/Filter";
import { MarketplaceAction, MarketplaceState } from "../pages/Marketplace/MarketplaceReducer";

interface MobileFilterButtonProps {
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
}

export const MobileFilterButton = (props: MobileFilterButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const bg = getThemeBgColor();

  return (
    <>
      <Flex
        position="fixed"
        bottom="0px"
        left="0px"
        right="0px"
        maxWidth="100vw"
        zIndex="12"
        transform="translateX(0px) translateY(0%) translateZ(0px);"
        justifyContent="center"
        paddingInline="1rem"
        paddingBottom="1.5rem"
        display={{ base: "flex", lg: "none" }}>
        <Button
          textTransform="initial"
          borderRadius="full"
          p="0"
          minWidth="3rem"
          width="66%"
          leftIcon={<AiOutlineFilter />}
          onClick={onOpen}>
          Filter
        </Button>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
        preserveScrollBarGap>
        <DrawerOverlay />
        <DrawerContent bg={bg} maxHeight="calc(100% - 5rem)">
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody>
            <Filter state={props.state} dispatch={props.dispatch} props={{}} />
          </DrawerBody>
          <DrawerFooter>
            <Flex flexDir="row" width="100%" gap="2rem">
              <Button
                flex="1"
                minWidth="3rem"
                bgColor="grey"
                onClick={() => {
                  onClearFilters(props.dispatch);
                  onClose();
                }}>
                Reset All
              </Button>
              <Button flex="1" minWidth="3rem" onClick={onClose}>
                Done
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
