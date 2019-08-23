import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 2,
})`
  width: 230px;
  height: 200px;
  margin-left: 30px;
  background-color: #fff;
  border-radius: 4px;
  border-width: 1;
  border-color: #fafafdcc;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 1);
`;

export const Tag = styled.View`
  height: 20px;
  justify-content: center;
  border-color: #ddd;
`;
