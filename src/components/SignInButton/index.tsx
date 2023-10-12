import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as S from './styles'
interface SignInButtonProps extends TouchableOpacityProps{
    title:string
    name:string
}

export function SignInButton({title,name,...rest}:SignInButtonProps){
    return (
      <S.Button {...rest} activeOpacity={0.7}>
          <S.IconContainer>
              <S.Icon name={name}/>
          </S.IconContainer>
          <S.Title>{title}</S.Title>
      </S.Button>
    )   
}