import React from 'react';
import {Avatar, Input} from 'react-native-elements';
import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';

const color = '#43484d';

const StyledView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
`;

const StyledInput = styled(Input).attrs({
  containerStyle: {
    flex: 1,
    marginHorizontal: 10,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  inputStyle: {
    fontSize: 14,
  },
  errorStyle: {
    display: 'none',
  },
})``;

// TODO: use styled components for Avatar
const styles = StyleSheet.create({
  containerAvatar: {
    backgroundColor: color,
  },
});

export default function Header() {
  return (
    <StyledView>
      <Avatar
        rounded
        size={25}
        icon={{type: 'ion-icons', name: 'person', size: 20}}
        containerStyle={styles.containerAvatar}
      />
      <StyledInput
        autoCompleteType={undefined}
        placeholder="Bài hát, playlist, nghệ sĩ..."
        leftIcon={{
          type: 'ion-icons',
          name: 'search',
          size: 20,
          color,
        }}
        rightIcon={{type: 'ion-icons', name: 'mic', size: 20, color}}
      />
      <Icon name="notifications-outline" size={25} color={color} />
    </StyledView>
  );
}
