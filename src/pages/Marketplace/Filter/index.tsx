import styled from "@emotion/styled";
import React from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Show,
  VStack,
} from "@chakra-ui/react";
import { TraitEnum } from "../../../types/types";
import { MarketplaceAction, MarketplaceState } from "../MarketplaceReducer";
import PAYCNumSearchInput from "./PAYCNumSearchInput";

// Option Constants With Header as First Item
const bgOptions = [
  "Background",
  "Aquamarine",
  "Army Green",
  "Blue",
  "Gray",
  "New Punk Blue",
  "Orange",
  "Purple",
  "Yellow",
];
const clothesOptions = [
  "Clothes",
  "Admirals Coat",
  "Bandolier",
  "Bayc T Black",
  "Bayc T Red",
  "Biker Vest",
  "Black Holes T",
  "Black Suit",
  "Black T",
  "Blue Dress",
  "Bone Necklace",
  "Bone Tee",
  "Caveman Pelt",
  "Cowboy Shirt",
  "Guayabera",
  "Hawaiian",
  "Hip Hop",
  "Kings Robe",
  "Lab Coat",
  "Leather Jacket",
  "Leather Punk Jacket",
  "Lumberjack Shirt",
  "Navy Striped Tee",
  "Pimp Coat",
  "Prison Jumpsuit",
  "Prom Dress",
  "Puffy Vest",
  "Rainbow Suspenders",
  "Sailor Shirt",
  "Service",
  "Sleeveless Logo T",
  "Sleeveless T",
  "Smoking Jacket",
  "Space Suit",
  "Striped Tee",
  "Stunt Jacket",
  "Tanktop",
  "Tie Dye",
  "Toga",
  "Tuxedo Tee",
  "Tweed Suit",
  "Vietnam Jacket",
  "Wool Turtleneck",
  "Work Vest",
];
const earringOptions = [
  "Earring",
  "Cross",
  "Diamond Stud",
  "Gold Hoop",
  "Gold Stud",
  "Silver Hoop",
  "Silver Stud",
];
const eyesOptions = [
  "Eyes",
  "3d",
  "Angry",
  "Blindfold",
  "Bloodshot",
  "Blue Beams",
  "Bored",
  "Closed",
  "Coins",
  "Crazy",
  "Cyborg",
  "Eyepatch",
  "Heart",
  "Holographic",
  "Hypnotized",
  "Laser Eyes",
  "Robot",
  "Sad",
  "Scumbag",
  "Sleepy",
  "Sunglasses",
  "Wide Eyed",
  "X Eyes",
  "Zombie",
];
const furOptions = [
  "Fur",
  "Black",
  "Blue",
  "Brown",
  "Cheetah",
  "Cream",
  "Dark Brown",
  "Death Bot",
  "Dmt",
  "Golden Brown",
  "Gray",
  "Noise",
  "Pink",
  "Red",
  "Robot",
  "Solid Gold",
  "Tan",
  "Trippy",
  "White",
  "Zombie",
];
const hatOptions = [
  "Hat",
  "Army Hat",
  "Baby's Bonnet",
  "Bandana Blue",
  "Bayc Flipped Brim",
  "Bayc Hat Black",
  "Bayc Hat Red",
  "Beanie",
  "Bowler",
  "Bunny Ears",
  "Commie Hat",
  "Cowboy Hat",
  "Faux Hawk",
  "Fez",
  "Fisherman's Hat",
  "Girl's Hair Pink",
  "Girl's Hair Short",
  "Halo",
  "Horns",
  "Irish Boho",
  "King's Crown",
  "Laurel Wreath",
  "Party Hat 1",
  "Party Hat 2",
  "Police Motorcycle Helmet",
  "Prussian Helmet",
  "S&m Hat",
  "Safari",
  "Sea Captain's Hat",
  "Seaman's Hat",
  "Short Mohawk",
  "Spinner Hat",
  "Stuntman Helmet",
  "Sushi Chef Headband",
  "Trippy Captain's Hat",
  "Vietnam Era Helmet",
  "Ww2 Pilot Helm",
];
const mouthOptions = [
  "Mouth",
  "Bored",
  "Bored Bubblegum",
  "Bored Cigar",
  "Bored Cigarette",
  "Bored Dagger",
  "Bored Kazoo",
  "Bored Party Horn",
  "Bored Pipe",
  "Bored Pizza",
  "Bored Unshaven",
  "Bored Unshaven Bubblegum",
  "Bored Unshaven Cigar",
  "Bored Unshaven Cigarette",
  "Bored Unshaven Dagger",
  "Bored Unshaven Kazoo",
  "Bored Unshaven Party horn",
  "Bored Unshaven Pipe",
  "Bored Unshaven Pizza",
  "Discomfort",
  "Dumbfounded",
  "Grin",
  "Grin Diamond Grill",
  "Grin Gold Grill",
  "Grin Multicolored",
  "Jovial",
  "Phoneme ooo",
  "Phoneme L",
  "Phoneme Oh",
  "Phoneme Vuh",
  "Phoneme Wah",
  "Rage",
  "Small Grin",
  "Tongue Out",
];

const onClearFilters = (dispatch: React.Dispatch<MarketplaceAction>) => {
  dispatch({ type: "RESET" });
};

const onToggleHideFilters = (dispatch: React.Dispatch<MarketplaceAction>) => {
  dispatch({ type: "TOGGLE_HIDE_FILTERS" });
};

const mobileWidth = 700;

interface DropDownProps {
  options: string[];
  filterType: TraitEnum;
  dispatch: React.Dispatch<MarketplaceAction>;
  state: MarketplaceState;
}

const DropDown = ({ options, filterType, dispatch, state }: DropDownProps) => {
  const handleOptionClicked = (filterType: TraitEnum, option: string) => {
    dispatch({ type: "SELECT", key: filterType, value: option });
  };

  return (
    <AccordionItem color="brand.main">
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" color="brand.main">
            {options[0]}
          </Box>
          <AccordionIcon color="brand.main" />
        </AccordionButton>
      </h2>
      <AccordionPanel
        pb={4}
        maxHeight="298px"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "white",
            borderRadius: "24px",
          },
        }}>
        <VStack align="start" spacing={2}>
          {options.map(
            (option, idx) =>
              idx !== 0 && (
                <Checkbox
                  key={Math.random()}
                  value={`${idx}`}
                  onChange={() => handleOptionClicked(filterType, option)}
                  isChecked={state[filterType].includes(option)}
                  colorScheme="brand">
                  {option}
                </Checkbox>
              ),
          )}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

interface FilterProps {
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
}

// TODO: Remove repeating code
const Filter = ({ state, dispatch }: FilterProps) => {
  const dropdownOptions = [
    { options: bgOptions, filterType: TraitEnum.Bg },
    { options: clothesOptions, filterType: TraitEnum.Clothes },
    { options: earringOptions, filterType: TraitEnum.Earring },
    { options: eyesOptions, filterType: TraitEnum.Eyes },
    { options: furOptions, filterType: TraitEnum.Fur },
    { options: hatOptions, filterType: TraitEnum.Hat },
    { options: mouthOptions, filterType: TraitEnum.Mouth },
  ];

  return (
    <Main>
      {!state.hideFilters && (
        <Accordion allowMultiple>
          {dropdownOptions.map((dropdown, index) => (
            <DropDown
              key={index}
              options={dropdown.options}
              filterType={dropdown.filterType}
              dispatch={dispatch}
              state={state}
            />
          ))}
        </Accordion>
      )}
      {!state.hideFilters && <PAYCNumSearchInput state={state} dispatch={dispatch} />}
      <Flex width="100%" paddingInline="2px">
        <Show below="md">
          <Button w="50%" onClick={() => onToggleHideFilters(dispatch)}>
            {state.hideFilters ? "Show" : "Hide"}
          </Button>
        </Show>
        <Button w={{ base: "50%", md: "100%" }} onClick={() => onClearFilters(dispatch)}>
          Reset Filters
        </Button>
      </Flex>
    </Main>
  );
};

// Styles
const Main = styled("div")`
  display: flex;
  flex-direction: column;
  padding-right: 2rem;

  @media (max-width: ${mobileWidth}px) {
    margin: 2rem 0;
    padding-right: 0;
  }
`;

export default Filter;
