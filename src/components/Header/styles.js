import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 30px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 24px;
  background: #ddd;
`;
