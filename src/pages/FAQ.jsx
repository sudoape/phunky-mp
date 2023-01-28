import React from "react";
import styled from "@emotion/styled";

import CommonContainer from "../uikit/CommonContainer/CommonContainer";
import Header from "../components/Header/Header";
import PageTitle from "../uikit/PageTitle/PageTitle";

const FAQ = ({ web3 }) => {
  return (
    <CommonContainer>
      <Header web3={web3} />
      <PageTitle title="FAQ" />
      <Container>SOON™</Container>
    </CommonContainer>
  );
};

const Container = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FAQ;
