import styled, { css } from 'styled-components/native';
import {TextInput} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
export const Container = styled(TextInput)`
  width: 100%;
  padding: 18px;
  border-radius: 8px;
  font-size: ${RFValue(14)}px;
  margin-bottom: 8px;
  ${({theme})=>css`
    font-family: ${theme.fonts.regular};
    background-color: ${theme.colors.shape};
    color: ${theme.colors.text_dark};

  `}
`
