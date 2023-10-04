import React from 'react'
import * as S from './styles'
import { TouchableOpacityProps } from 'react-native';
interface Props extends TouchableOpacityProps {
  title:string
}
export function ButtonCategorySelect({title,...rest}:Props){
  return (
    <S.Container {...rest}>
      <S.Category>{title}</S.Category>
     <S.Icon  name="chevron-down"/>
    </S.Container>  
  );
}