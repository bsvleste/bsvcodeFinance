import React from 'react'
import * as S from './styles'
import { FlatList } from 'react-native'
import { categories } from '../../util/categories'
import { Button } from '../../components/Form/Button'
interface ICategory{
  key:string
  name:string
}
interface Props{
  category:ICategory
  setCategory:(category:ICategory) => void
  closeSelectedCategory:()=>void
}
export function CategorySelect({category,setCategory,closeSelectedCategory}:Props){
  
  function handleCategorySelected(category:ICategory){
    setCategory(category)
    
  }
  return (
    <S.Container>
      <S.Header>
        <S.Title>Categorias</S.Title>
      </S.Header>
      <FlatList
        data={categories}
        style={{flex:1,width:"100%"}}
        keyExtractor={(item)=>item.key}
        renderItem={({item})=>(
          <S.Category 
            onPress={()=>handleCategorySelected(item)}
            isActive={category.key === item.key}
          >
            <S.Icon name={item.icon} color={item.color} />
            <S.Name>{item.name}</S.Name>            
          </S.Category>
        )}
        ItemSeparatorComponent={()=><S.Separator />}
      />
      <S.Footer>
        <Button title="Selecionar categoria" onPress={closeSelectedCategory}/>        
      </S.Footer>
    </S.Container>
  );
}