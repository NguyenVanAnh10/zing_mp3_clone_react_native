import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native-elements';

import withTrackBottomSheet from 'HOCs/withTrackBottomSheet';
import useSongs from 'hooks/useSongs';

const StyledSafeAreaView = styled.View`
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

function Home() {
  const [, {getSongs}] = useSongs();
  useEffect(() => {
    getSongs();
  }, []);

  return (
    <StyledSafeAreaView>
      <Text>Home</Text>
    </StyledSafeAreaView>
  );
}

export default withTrackBottomSheet(Home);
