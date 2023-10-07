import React, { useCallback, useEffect, useState } from 'react'
import {Keyboard, TouchableWithoutFeedback,Alert} from 'react-native'
import * as S from './styles'
import { Button } from '../../components/Form/Button';
import { TransactionButton } from '../../components/Form/TransactionButton';
import { ButtonCategorySelect } from '../../components/Form/ButtonCategorySelect';
import { Modal } from 'react-native';
import { CategorySelect } from '../CategorySelect';
import {Controller,useForm} from 'react-hook-form'
import { InputForm } from '../../components/Form/InputForm';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';
interface FormData{
  name:string
  amount:number
}

const schema = yup.object().shape({
  name:yup.string().required("Nome é obrigatorio").min(3,"O nome deve ter ao menos 3 caracteres"),
  amount:yup.number()
  .typeError("Informe um valor numerico")
  .positive("O valor não pode ser negativo")
  .required("O valor é obrigatorio")
})
export function Register() {
  const collectionKey = '@bsvcodeFinance:transactions'
  const {control,handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  })
  const[transactionType,setTransactionType] = useState('')
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  function handleTransactionType(type:"up"| 'down'){
    setTransactionType(type)
  }
  function handleOpenSelectCategoryModal() {
    setIsCategoryModalOpen(true)
  }
  function handleCloseSelectCategoryModal() {
    setIsCategoryModalOpen(false)
  }
  async function handleRegister(form:FormData){
    if(!transactionType) return Alert.alert("Informe o tipo de transação")
    if(category.key === 'category') return Alert.alert("Informe a categoria")
    const newTransaction={
      name:form.name,
      amount:form.amount,
      transactionType,
      category:category.key
    }
    try {
      const transactionData = await AsyncStorage.getItem(collectionKey);
      const currentData = transactionData ? JSON.parse(transactionData) : []
      const dataFormatted =[
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(collectionKey,JSON.stringify(dataFormatted))
    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possivel salvar,tente novamente")
    }    
  }
useFocusEffect(useCallback(()=>{
  async function LaodData(){
    const data = await AsyncStorage.getItem(collectionKey)
    console.log(JSON.parse(data!))
  }
  LaodData();
},[]))
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>
      <S.FormWrapper>
        <S.Fields>
          <InputForm 
            control={control}
            name="name"
            placeholder='Nome'
            autoCapitalize='sentences'
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm 
            control={control}
            name="amount"
            placeholder='Preco'
            keyboardType='numeric'
            error={errors.amount && errors.amount.message}
          />
          <S.TransactionTypes>
            <TransactionButton 
            isActive={transactionType === 'up'}
            title='Income' 
            type='up'
            onPress={()=>handleTransactionType('up')}/>
            <TransactionButton 
              isActive={transactionType === 'down'}
              title='OutCome' 
              type='down' 
              onPress={()=>handleTransactionType('down')}/>
          </S.TransactionTypes>
            <ButtonCategorySelect  title={category.name} onPress={handleOpenSelectCategoryModal}/>
          </S.Fields>
        <Button  title="Enviar" onPress={handleSubmit(handleRegister)} />
      </S.FormWrapper>
      <Modal visible={isCategoryModalOpen}>
          <CategorySelect 
            category={category}
            closeSelectedCategory={handleCloseSelectCategoryModal}
            setCategory={setCategory} /> 
      </Modal>
    </S.Container>
  </TouchableWithoutFeedback>
  );
}