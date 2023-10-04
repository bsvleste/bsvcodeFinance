import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
interface TransactionsProps {
  type: "up" | "down";
  isActive: boolean;
}
export const Container = styled(TouchableOpacity)<TransactionsProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  padding: 16px;
  ${({ theme, type, isActive }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${theme.colors.attention_light};
      border: ${theme.colors.attention};
    `}
  ${({ theme, type, isActive }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${theme.colors.success_light};
      border: ${theme.colors.success};
    `}
`;

export const Icon = styled(Feather)<TransactionsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ type, theme }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;
export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
  `}
`;
