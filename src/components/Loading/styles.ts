import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Loading = styled.ActivityIndicator`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 48px;
`;
