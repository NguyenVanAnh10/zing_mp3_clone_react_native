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

import {StyleSheet} from 'react-native';

const color = '#6733b9';

const StyledContainerView = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: white;
`;

const StyledView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledTitleView = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
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

export default function TrackPlayerComponent({songs = []}: {songs: any[]}) {
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
  }, [songs]);

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
    <StyledContainerView>
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
    </StyledContainerView>
  );
}

const StyledSlider = styled(Slider).attrs({
  trackStyle: {
    height: 2,
    backgroundColor: 'transparent',
  },
  thumbStyle: {
    height: 7,
    width: 7,
    backgroundColor: color,
  },
})`
  margin-top: -30px;
  margin-bottom: -10px;
  margin-left: -10px;
  margin-right: -10px;
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
    </>
  );
};
