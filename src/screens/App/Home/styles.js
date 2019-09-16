import styled from 'styled-components/native';
import {Platform, Dimensions} from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.background};
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
  width: 42px;
  height: 42px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.background2};
  border-radius: 22px;
  margin-right: 10px;
`;

export const QuestionContainer = styled.View`
  margin-left: 30px;
  background-color: ${props => props.theme.card};
  border-width: 1;
  border-color: ${props => props.theme.background2};
  border-bottom-width: 0;
  width: ${Dimensions.get('window').width - 60};
`;

export const QuestionModalBackdrop = styled.View`
  padding: 20px;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const QuestionModalContainer = styled.View.attrs({
  elevation: 2,
})`
  width: 90%;
  height: 240;
  border-color: ${props => props.theme.background2};
  border-width: 1;
  background-color: ${props => props.theme.background};
  padding: 10px;
  border-radius: 4px;
`;

export const CloseModalButton = styled.TouchableOpacity`
  padding: 5px;
  margin-top: ${Platform.OS === 'ios' ? 10 : 0};
  margin-bottom: ${Platform.OS === 'ios' ? 10 : 0};
  height: ${Platform.OS === 'ios' ? 48 : 38};
  width: ${Platform.OS === 'ios' ? 48 : 38};
  align-items: center;
  justify-content: center;
`;
