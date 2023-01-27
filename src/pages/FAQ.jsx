import React from "react";
import styled from "@emotion/styled";

import CommonContainer from "../uikit/CommonContainer/CommonContainer";
import Header from "../components/Header/Header";
import PageTitle from "../uikit/PageTitle/PageTitle";
import Web3 from "web3";
import { web3ProviderURL } from "../consts";

const FAQ = () => {
  const web3 = new Web3(web3ProviderURL);
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
