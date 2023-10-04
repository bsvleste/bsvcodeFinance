import styled, { css } from 'styled-components/native';
import {TouchableOpacity,Text} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
export const Container = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme})=>theme.colors.secondary};
    border-radius:8px;
    justify-content: center;
    align-items: center;
    `
export const Title = styled.Text`
  font-size:${RFValue(14)}px;
  ${({theme})=>css`
  font-family: ${theme.fonts.medium};
  color:${theme.colors.shape};
  padding: 18px;
  `}
`