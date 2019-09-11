import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 230px;
  height: 200px;
  margin-left: 30px;

  background-color: ${props => props.colors.card};
  border: 1px solid ${props => props.colors.background2};
`;

export const Tag = styled.View`
  height: 20px;
  justify-content: center;
  border-color: #ddd;
`;
