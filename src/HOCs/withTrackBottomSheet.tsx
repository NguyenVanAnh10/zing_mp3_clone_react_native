import React, {ComponentType} from 'react';

import TrackPlayer from 'components/TrackPlayer';
import useSongs from 'hooks/useSongs';

function withTrackBottomSheet(Component: ComponentType<any>) {
  return () => {
    const [{songs}] = useSongs();

    return (
      <>
        <Component />
        <TrackPlayer songs={songs} />
      </>
    );
  };
}

export default withTrackBottomSheet;
