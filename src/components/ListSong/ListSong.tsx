import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';

import useSongs from 'hooks/useSongs';

export default function ListSong() {
  const [{songs}, {getSongs}] = useSongs();

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <View>
      <FlatList
        data={songs}
        renderItem={({item}) => (
          <ListItem key={item.encodeId} bottomDivider>
            <Avatar source={{uri: item.thumbnail}} />
            <ListItem.Content>
              <ListItem.Title numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                {item.artistsNames}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={item => item.encodeId}
      />
    </View>
  );
}
