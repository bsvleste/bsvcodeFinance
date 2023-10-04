import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;
export const FormWrapper = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  justify-content: space-between;
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
export const Fields = styled.View``;
export const TransactionTypes = styled.View`
  margin-top: 8px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
`;
