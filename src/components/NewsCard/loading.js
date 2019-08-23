import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function NewsCard() {
  return (
    <>
      <ShimmerPlaceHolder
        autoRun
        style={{marginLeft: 30, width: 230, height: 200, borderRadius: 4}}
        hasBorder
      />
      <ShimmerPlaceHolder
        autoRun
        style={{marginLeft: 30, width: 230, height: 200, borderRadius: 4}}
        hasBorder
      />
    </>
  );
}
