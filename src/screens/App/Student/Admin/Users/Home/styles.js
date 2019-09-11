import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.colors.background};
  padding: 0 30px;
`;

export const UserCard = styled.TouchableOpacity`
  padding: 10px;
  background: ${props => props.colors.card};
  border-radius: 4px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.colors.background2};
`;
