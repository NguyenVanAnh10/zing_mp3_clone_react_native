import React, {useEffect, useState} from 'react';
import {Text, Button, Avatar, Slider} from 'react-native-elements';
import TrackPlayer, {
  Event,
  Track,
  useProgress,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import styled from 'styled-components/native';

import sound from 'assets/musics/test-music.mp3';
import {StyleSheet} from 'react-native';
import {showMinuteAndSecondFromSeconds} from 'utils/time';

const color = '#6733b9';
const StyledView = styled.View`
  margin-top: 10;
  flex-direction: row;
  align-items: center;
`;

const StyledTitleView = styled.View`
  flex: 1;
  margin-left: 10;
  margin-right: 10;
`;

const StyledText = styled(Text)``;
const StyledControllerButton = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: 'transparent',
    padding: 0,
    marginLeft: 7,
  },
})``;

// TODO: use styled components for Avatar
const styles = StyleSheet.create({
  containerAvatar: {
    backgroundColor: color,
  },
});

const songs = [
  {
    url: sound, // Load media from the app bundle
    title: 'Chiều thành đô',
    artist: 'Tuấn Vũ',
  },
  {
    url: sound, // Load media from the app bundle
    title: '2',
    artist: 'Tuấn Vũ 2',
  },
];

export default function TrackPlayerComponent() {
  const [currentSong, setCurrentSong] = useState<Track>();
  const playbackState = usePlaybackState();

  useEffect(() => {
    async function register() {
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.add(songs);
      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async () => {
        const trackId = await TrackPlayer.getCurrentTrack();
        const track = await TrackPlayer.getTrack(trackId);
        setCurrentSong(track);
      });
    }
    register();
  }, []);

  const onPlay = () => {
    TrackPlayer.play();
  };

  const onPause = () => {
    TrackPlayer.pause();
  };

  const onStop = () => {
    TrackPlayer.stop();
  };

  const onSkipToPrevious = () => {
    TrackPlayer.skipToPrevious();
  };

  const onSkipToNext = () => {
    TrackPlayer.skipToNext();
  };

  return (
    <>
      <PlaySlider />
      <StyledView>
        <Avatar
          rounded
          size={40}
          icon={{
            type: 'ionicon',
            name: 'musical-note',
            size: 25,
          }}
          containerStyle={styles.containerAvatar}
        />
        <StyledTitleView>
          <StyledText numberOfLines={2} ellipsizeMode="tail">
            {currentSong?.title}
          </StyledText>
          <StyledText>{currentSong?.artist}</StyledText>
        </StyledTitleView>
        <StyledControllerButton
          icon={{
            name: 'play-skip-back',
            type: 'ionicon',
            size: 22,
            color: 'black',
          }}
          onPress={onSkipToPrevious}
        />
        <StyledControllerButton
          icon={{
            name: playbackState === State.Playing ? 'pause' : 'play',
            type: 'ionicon',
            size: 22,
            color: 'black',
          }}
          onPress={playbackState === State.Playing ? onPause : onPlay}
        />
        <StyledControllerButton
          icon={{
            name: 'stop',
            type: 'ionicon',
            size: 22,
            color: 'black',
          }}
          onPress={onStop}
        />
        <StyledControllerButton
          icon={{
            name: 'play-skip-forward',
            type: 'ionicon',
            size: 22,
            color: 'black',
          }}
          onPress={onSkipToNext}
        />
      </StyledView>
    </>
  );
}

const StyledSlider = styled(Slider).attrs({
  trackStyle: {
    height: 3,
    backgroundColor: 'transparent',
  },
  thumbStyle: {
    height: 10,
    width: 10,
    backgroundColor: color,
  },
})``;

const StyledTimeView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const StyledTimeText = styled(Text)`
  font-size: 10;
`;

const PlaySlider = () => {
  const {position, duration} = useProgress();

  return (
    <>
      <StyledSlider
        allowTouchTrack
        value={position}
        // onValueChange={setValue}
        maximumValue={duration}
        minimumValue={0}
        minimumTrackTintColor={color}
        step={1}
      />
      <StyledTimeView>
        <StyledTimeText>
          {showMinuteAndSecondFromSeconds(position)}
        </StyledTimeText>
        <StyledTimeText>
          {showMinuteAndSecondFromSeconds(duration)}
        </StyledTimeText>
      </StyledTimeView>
    </>
  );
};
