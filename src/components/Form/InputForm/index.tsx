import React from 'react'
import { TextInputProps } from 'react-native';
import { Input } from '../Input';
import * as S from './styles'
import { Control, Controller } from 'react-hook-form';
interface Props extends TextInputProps{
    control:Control
    name:string
    error:string

}
export function InputForm({error,control,name,...rest}:Props){
  return (
    <S.Container >
      <Controller 
        control={control}
        name={name}
        render={({field:{onChange,value}})=>(
          <Input 
            onChangeText={onChange}
            value={value}
          {...rest}
          />
        )}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
}