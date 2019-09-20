import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.colors.background};
  padding: 10px 30px 0px 30px;
`;

export const QuestionCard = styled.TouchableOpacity`
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${props => props.colors.card};
  border-radius: 4px;
  border: 1px solid ${props => props.colors.background2};
`;
