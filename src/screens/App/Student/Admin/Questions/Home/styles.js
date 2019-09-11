import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.colors.background};
  padding: 0 30px;
`;

export const QuestionCard = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${props => props.colors.card};
  border-radius: 4px;
  border: 1px solid ${props => props.colors.background2};
`;
