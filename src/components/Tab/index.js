import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Container, TabButton, TabText} from './styles';

export default function Tab({tabs}) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Container>
      {tabs.map(tab => (
        <TabButton
          key={tab}
          onPress={() => setActiveTab(tab)}
          active={activeTab === tab}>
          <TabText h3 active={activeTab === tab}>
            {tab}
          </TabText>
        </TabButton>
      ))}
    </Container>
  );
}

Tab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
