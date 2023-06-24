import { MouseEventHandler, ReactNode } from "react";
import { Button, Flex, Grid, GridProps, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const mobileWidth = "700px";

interface PillProps {
  active?: boolean;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
}

export const Pill = ({ active, text, onClick, icon }: PillProps) => {
  const [isMobile] = useMediaQuery(`(max-width: ${mobileWidth})`);

  return (
    <Button
      variant="pill"
      onClick={onClick}
      isActive={active}
      p={isMobile ? "4px 8px" : "8px 16px"}>
      {icon && <Flex margin="0 .5rem 0 0">{icon}</Flex>}
      {text}
    </Button>
  );
};

interface PillGroupProps extends GridProps {
  children: React.ReactNode;
}

export const PillGroup = ({ children, ...props }: PillGroupProps) => {
  console.log(React.Children.count(children));
  return (
    <Grid templateColumns={`repeat(${React.Children.count(children)}, 1fr)`} gap="1rem" {...props}>
      {children}
    </Grid>
  );
};
