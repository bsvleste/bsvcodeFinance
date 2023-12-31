import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

export const Button = styled.TouchableOpacity`
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
`;
export const IconContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 2px;
`;
export const Title = styled.Text`
  flex: 1;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`;
export const Icon = styled(AntDesign)`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme }) => theme.colors.text_dark};
`;
