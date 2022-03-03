import React from 'react';
import {Avatar} from 'react-native-elements';

import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header() {
  return (
    <View>
      <Avatar
        size={32}
        rounded
        icon={{name: 'person', type: 'ion-icons', size: 25}}
        containerStyle={{backgroundColor: '#000'}}
      />
      <TextInput placeholder="Bài hát, playlist, nghệ sĩ..." />
      <Icon name="notifications-outline" size={25} />
    </View>
  );
}
