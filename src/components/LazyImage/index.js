import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import PropTypes from 'prop-types';

import {Small, Original} from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({source, thumb, shouldLoad}) {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      setLoaded(true);
    }
  }, [shouldLoad]);

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small
      source={thumb}
      blurRadius={7}
      imageStyle={{borderTopRightRadius: 4, borderTopLeftRadius: 4}}>
      {loaded && (
        <OriginalAnimated
          style={{opacity}}
          source={source}
          onLoadEnd={handleAnimate}
        />
      )}
    </Small>
  );
}

LazyImage.propTypes = {
  source: PropTypes.objectOf(PropTypes.string).isRequired,
  thumb: PropTypes.objectOf(PropTypes.string).isRequired,
  shouldLoad: PropTypes.bool.isRequired,
};
