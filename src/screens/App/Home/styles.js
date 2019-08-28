import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f7fb;
`;

export const SubjectsList = styled.ScrollView``;

export const SubjectsView = styled.View`
  padding: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const QuickItems = styled.View`
  flex-direction: row;
`;

export const Item = styled.TouchableOpacity`
  padding: 5px;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e9f1;
  border-radius: 18px;
  margin-right: 10px;
`;
