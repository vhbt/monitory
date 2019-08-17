import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';

import {Card, CardBanner, CardInfo} from './styles';

export default function SubjectCard({source, name, count}) {
  return (
    <Card>
      <CardBanner source={{uri: source}} />
      <CardInfo>
        <Text style={{textAlign: 'center'}}>{name}</Text>
        <Text gray style={{textAlign: 'center'}}>
          {count} monitores
        </Text>
      </CardInfo>
    </Card>
  );
}

SubjectCard.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
