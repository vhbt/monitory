import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {withTheme} from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../Text';

import {Container} from './styles';

function EventsCard({
  theme,
  title,
  desc,
  image,
  featured,
  past,
  onPress,
  admin,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{height: featured ? 150 : 100}}
      disabled={past && !admin}>
      <ImageBackground
        source={{uri: image}}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 4,
          backgroundColor: theme.card,
          tintColor: 'gray',
        }}
        imageStyle={{borderRadius: 4}}
        blurRadius={0.5}>
        <Container past={past}>
          <Text white bold>
            {title}
          </Text>
          <Text white medium>
            {desc}
          </Text>
          {past ? (
            <Text style={{color: theme.accent}}>Evento passado</Text>
          ) : null}
        </Container>
      </ImageBackground>
    </TouchableOpacity>
  );
}

EventsCard.propTypes = {
  theme: PropTypes.shape({
    card: PropTypes.string,
    accent: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  featured: PropTypes.bool.isRequired,
  past: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  admin: PropTypes.bool,
};

EventsCard.defaultProps = {
  admin: false,
};

export default withTheme(EventsCard);
