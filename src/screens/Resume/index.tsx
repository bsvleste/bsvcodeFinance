import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import { useFocusEffect } from '@react-navigation/native';
import { categories } from '../../util/categories';
import * as S from './styles'
import { RFValue } from 'react-native-responsive-fontsize';
import PieChart from 'react-native-pie-chart'
import { Loading } from '../../components/Loading';
interface TransactionsData{
  title: string,
  amount: string,
  category: string,
  date: string,
  type: "up" | "down"
}
interface CategoryData {
  name:string
  totalFormatted:string
  total:number
  color:string
  percentFormatted:string
  percent:number
}
export function Resume(){
  const [isLoading,setIsLaoding] = useState(true)
  const [categoriesExpensives,setCategoriesExpensives] = useState<CategoryData[]>([])
  async function laodData() {
    const collectionKey = '@bsvcodeFinance:transactions'
    const transactionData = await AsyncStorage.getItem(collectionKey);
    const currentData = transactionData ? JSON.parse(transactionData) : []

   const expensives = currentData
    .filter((expensive:TransactionsData) =>expensive.type === 'down')
    const expensivesTotal = expensives.reduce((accumulator:number,expensive:TransactionsData)=>{
      return accumulator + Number(expensive.amount)
    },0)
    
    const totalByCategory:CategoryData[] = []
    categories.forEach(category =>{
      let categorySum = 0;
      expensives.forEach((expensive:TransactionsData) => {
          if(expensive.category === category.key){
            categorySum += Number(expensive.amount)
          } 
      })
      if(categorySum > 0){
        const total = categorySum.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL',
        })
        const percent = (categorySum / expensivesTotal * 100) 
        const percentFormatted = `${percent.toFixed(0)}%` 
        totalByCategory.push({
          name: category.name,
          color: category.color,
          total:categorySum,
          percent,
          percentFormatted,
          totalFormatted:total
        })
      }
    })
    setCategoriesExpensives(totalByCategory)
    setIsLaoding(false)
  }
  useEffect(()=>{
    laodData()
  },[])
  useFocusEffect(useCallback(()=>{
		laodData();
	},[]))
  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      <S.Content>
        {isLoading? <Loading/> :
        <>
        <S.ChartContainer>
        <PieChart 
          widthAndHeight={RFValue(250)} 
          series={categoriesExpensives.map(category=>category.percent)} 
          sliceColor={categoriesExpensives.map(category=>category.color)} />
        </S.ChartContainer>
      {
        categoriesExpensives.map(category => (
          <HistoryCard
          key={category.name}
          percent={category.percentFormatted}
          title={category.name}
          amount={category.totalFormatted}
          color={category.color}
          />
        ))
      }
      </>
      }
      </S.Content>
    </S.Container>
  );
}