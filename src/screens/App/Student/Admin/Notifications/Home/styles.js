import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.colors.background};
`;

export const NotificationCard = styled.TouchableOpacity`
  background-color: ${props => props.colors.card};
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${props => props.colors.background2};
`;
