import styled from "@emotion/styled";

import CommonContainer from "../uikit/CommonContainer/CommonContainer";
import Header from "../components/Header/Header";
import { Text } from "@chakra-ui/react";

const FAQ = ({ web3 }) => {
  return (
    <>
      <Header web3={web3} />
      <CommonContainer>
        <Text textStyle="h2">FAQ</Text>
        <Container>SOON™</Container>
      </CommonContainer>
    </>
  );
};

const Container = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FAQ;
