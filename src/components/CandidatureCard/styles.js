import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.card};
  padding: 30px 20px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
