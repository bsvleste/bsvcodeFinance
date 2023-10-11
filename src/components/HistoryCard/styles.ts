import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 16px 24px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 4px;
  border-left-width: 4px;
  border-color: ${({ color }) => color};
  margin-bottom: 12px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;
export const Amount = styled.Text`
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text_dark};
  `}
`;
