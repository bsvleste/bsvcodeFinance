import React, { useState } from 'react'
import * as S from './styles'
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionButton } from '../../components/Form/TransactionButton';
import { ButtonCategorySelect } from '../../components/Form/ButtonCategorySelect';
import { Modal } from 'react-native';
import { CategorySelect } from '../CategorySelect';
export function Register() {
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
    console.log(category)
  }
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>
      <S.FormWrapper>
        <S.Fields>
        <Input
          placeholder='Nome'
        />
        <Input
          placeholder='Preço'
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
            <ButtonCategorySelect  title='Categorias' onPress={handleOpenSelectCategoryModal}/>
          </S.Fields>
        <Button  title="Enviar"/>
      </S.FormWrapper>
      <Modal visible={isCategoryModalOpen}>
          <CategorySelect 
            category={category}
            closeSelectedCategory={handleCloseSelectCategoryModal}
            setCategory={setCategory} /> 
      </Modal>
    </S.Container>
  );
}