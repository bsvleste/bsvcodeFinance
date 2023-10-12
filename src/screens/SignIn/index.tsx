import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import * as S from './styles'
import { useTheme } from 'styled-components/native';
import { SignInButton } from '../../components/SignInButton';
export function SignIn(){
  const {colors} = useTheme()
  return (
    <S.Container>
      <S.Header>
        <S.WrapperLogo>
          <MaterialIcons name="monetization-on" size={48} color={colors.attention} />
          <S.TitleLogo>BsvFinances</S.TitleLogo>
        </S.WrapperLogo>
        <S.Title>
          Controle suas {'\n'}
          finanças  de forma{'\n'} 
          muito simples
        </S.Title>
        <S.SignInTitle>Faça seu login com {'\n'} umas das contas abaixo </S.SignInTitle>
      </S.Header>
      <S.Footer>
        <S.FootWrapper>
          <SignInButton title='Entrar com Google' name="google" />
          <SignInButton title='Entrar com Apple' name="apple1" />
        </S.FootWrapper>
      </S.Footer>
    </S.Container>
  );
} 