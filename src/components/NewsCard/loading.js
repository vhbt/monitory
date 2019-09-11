import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import {getThemeColors} from '../../constants/theme';

export default function NewsCard() {
  const colors = getThemeColors();
  return (
    <>
      <ShimmerPlaceHolder
        colorShimmer={[
          colors.background2,
          colors.background2,
          colors.background,
        ]}
        style={{marginLeft: 30, width: 230, height: 200}}
      />
      <ShimmerPlaceHolder
        colorShimmer={[
          colors.background2,
          colors.background2,
          colors.background,
        ]}
        style={{marginLeft: 30, width: 230, height: 200}}
      />
    </>
  );
}
