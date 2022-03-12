import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';

import useSongs, {useSong} from 'hooks/useSongs';

export default function ListSong() {
  const [{songs}, {getSongs}] = useSongs();
  const [, {getSong}] = useSong();

  useEffect(() => {
    getSongs('Z6BOE7FB');
  }, []);

  const handlePressItem = async (id: string, index: number) => {
    await TrackPlayer.skip(index);
    getSong(id);
  };

  return (
    <View>
      <FlatList
        data={songs}
        renderItem={({item, index}) => (
          <ListItem
            key={item.encodeId}
            bottomDivider
            onPress={() => handlePressItem(item.encodeId as string, index)}>
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
