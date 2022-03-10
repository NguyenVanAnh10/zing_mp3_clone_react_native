import React from 'react';
import styled from 'styled-components/native';

import withTrackBottomSheet from 'HOCs/withTrackBottomSheet';
import ListSong from 'components/ListSong';

const StyledSafeAreaView = styled.View`
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

function Home() {
  return (
    <StyledSafeAreaView>
      <ListSong />
    </StyledSafeAreaView>
  );
}

export default withTrackBottomSheet(Home);
