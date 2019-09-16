import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

export const ModalContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.background};
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

export const NotificationCard = styled.TouchableOpacity`
  background-color: ${props => props.theme.card};
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${props => props.theme.background2};
`;
