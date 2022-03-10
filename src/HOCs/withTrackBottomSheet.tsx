import React, {ComponentType} from 'react';

import TrackPlayer from 'components/TrackPlayer';

function withTrackBottomSheet(Component: ComponentType<any>) {
  return () => {
    return (
      <>
        <Component />
        <TrackPlayer />
      </>
    );
  };
}

export default withTrackBottomSheet;
