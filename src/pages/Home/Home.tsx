import React from 'react';
import styled from 'styled-components/native';

import Header from 'components/Header';

const StyledSafeAreaView = styled.View`
  padding-top: 10;
  padding-left: 15;
  padding-right: 15;
`;

export default function Home() {
  return (
    <StyledSafeAreaView>
      <Header />
    </StyledSafeAreaView>
  );
}
