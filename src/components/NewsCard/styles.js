import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4,

  elevation: 8,
})`
  width: 230px;
  height: 200px;
  margin-left: 30px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Tag = styled.View`
  height: 20px;
  justify-content: center;
  border-color: #ddd;
`;
