import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Flex, FormControl, FormLabel, HStack, Input, Text } from "@chakra-ui/react";
import { MarketplaceAction, MarketplaceState } from "pages/Marketplace/MarketplaceReducer";

interface PAYCNumSearchInputProps {
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
}

const PAYCNumSearchInput = ({ state, dispatch }: PAYCNumSearchInputProps) => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace") {
      inputRefs[i].current.value = "";
      if (i !== 0) inputRefs[i - 1].current?.focus();
      e.preventDefault();
    } else if (e.key === "Enter") {
      // On Enter
      submitInputQuery();
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let { value } = e.target;
    // Ensure the value is a single digit
    value = value.slice(-1);
    inputRefs[index].current.value = value;

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }

    dispatch({ type: "SET_ID_QUERY", value: value, index: index });
  };

  const navigate = useNavigate();
  const submitInputQuery = () => {
    // Convert empty values to '0' in the state.id array
    const updatedIdArray = state.id.map((value) => (value ? value : "0"));
    const currentQuery = updatedIdArray.join("");
    navigate(`/details/${currentQuery}`);
  };

  useEffect(() => {
    // reset query on mount of component
    dispatch({ type: "RESET_ID_QUERY" });
  }, []);

  return (
    <FormControl
      margin="0.5rem"
      marginBottom="1rem"
      padding="0.5rem"
      maxW="95%" /* Weird ass overflow of padding without this */
    >
      <FormLabel marginY="0">
        <Text color={"brand.main"} fontWeight="bold" fontStyle="italic">
          PAYC#
        </Text>
      </FormLabel>
      <Flex align="center">
        <HStack spacing="4px">
          {inputRefs.map((ref, index) => (
            <Input
              key={index}
              ref={ref}
              maxLength={1}
              type="number"
              textAlign="center"
              borderRadius="3px"
              borderColor="brand.main"
              color="white"
              background="rgb(44, 50, 58)"
              border="0"
              width="32px"
              height="32px"
              padding="4px"
              _invalid={{ boxShadow: "none" }}
              focusBorderColor="brand.main"
              _focus={{
                background: "black",
              }}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleInputKeyDown(e, index)}
              style={{ caretColor: "transparent" }}
            />
          ))}
        </HStack>
        <Button width="40%" marginRight="0" onClick={submitInputQuery} variant="secondary">
          GO
        </Button>
      </Flex>
    </FormControl>
  );
};

export default PAYCNumSearchInput;
