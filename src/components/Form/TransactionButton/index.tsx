import React from 'react'
import * as S from './styles'
import { TouchableOpacityProps } from 'react-native';
const icons = {
  up:'arrow-up-circle',
  down:'arrow-down-circle'
}
interface Props  extends TouchableOpacityProps{
  title:string,
  type:"up"| "down"
  isActive:boolean
    
}
export function TransactionButton({title,type,isActive,...rest}:Props){
  return (
    <S.Container isActive={isActive} type={type} {...rest}>
      <S.Icon name={icons[type]} type={type}/>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}