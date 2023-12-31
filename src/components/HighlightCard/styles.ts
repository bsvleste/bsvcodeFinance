import styled, { css, DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
interface TypeProps {
  type: "up" | "down" | "total";
}
export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 8px;
  padding: 18px 24px;
  padding-bottom: ${RFValue(42)}px;
  margin-left: 16px;
`;
export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;
  ${(props) =>
    props.type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `};
  ${(props) =>
    props.type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `};
  ${(props) =>
    props.type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;
export const Footer = styled.View``;

const wrapperColor = {
  entries: (theme: DefaultTheme) => css`
    color: ${theme.colors.success};
  `,
  expensives: (theme: DefaultTheme) => css`
    color: ${theme.colors.attention};
  `,
  total: (theme: DefaultTheme) => css`
    color: ${theme.colors.shape};
  `,
};

export const Amount = styled(Text)<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  margin-top: 38px;
  ${({ type, theme }) => css`
    ${type === "up" && wrapperColor.entries(theme)}
  `}
  ${({ type, theme }) => css`
    ${type === "down" && wrapperColor.expensives(theme)}
  `}
  ${({ type, theme }) => css`
    ${type === "total" && wrapperColor.total(theme)}
  `}
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.primary : theme.colors.text};
`;
