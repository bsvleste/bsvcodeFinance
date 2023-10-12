import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 18px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.regular};
  `}
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 12px;
`;
export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 16px;
`;
export const ButtonMontSelect = styled(TouchableOpacity)``;
export const SelectIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(38)}px;
`;
export const Month = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(24)}px;
`;
