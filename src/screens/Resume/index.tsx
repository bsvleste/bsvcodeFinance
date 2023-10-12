import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import { useFocusEffect } from '@react-navigation/native';
import { categories } from '../../util/categories';
import * as S from './styles'
import { RFValue } from 'react-native-responsive-fontsize';
import PieChart from 'react-native-pie-chart'
import { Loading } from '../../components/Loading';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import { ScrollView } from 'react-native';
import dayjs from 'dayjs'
import 'dayjs/locale/pt'
import { Text } from 'react-native';
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
  const [selectedDate,setSelectedDate] = useState(()=>{
    return dayjs().set('date',1)
  });
  const [categoriesExpensives,setCategoriesExpensives] = useState<CategoryData[]>([])
 async function handleDateChange(action:"next"|"prev"){
  if(action === 'next'){
    setSelectedDate(selectedDate.add(1,'month'))   
  }else{
    setSelectedDate(selectedDate.subtract(1,'month'))
  }
 }
 const currentMont = dayjs(selectedDate).locale('pt-br').format("MMMM")
 const currentYear = dayjs(selectedDate).format("YYYY")
  async function laodData() {
    const collectionKey = '@bsvcodeFinance:transactions'
    const transactionData = await AsyncStorage.getItem(collectionKey);
    const currentData = transactionData ? JSON.parse(transactionData) : []

   const expensives = currentData
    .filter((expensive:TransactionsData) =>
      expensive.type === 'down' &&
      new Date(expensive.date).getMonth() === selectedDate.get('month') &&
      new Date(expensive.date).getFullYear() === selectedDate.get('year')       
      )
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
  useFocusEffect(useCallback(()=>{
		laodData();
	},[selectedDate]))
  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:24,paddingBottom:useBottomTabBarHeight()}}
      >
        {isLoading? <Loading/> :
        <>
        <S.MonthSelect>
          <S.ButtonMontSelect activeOpacity={0.7} onPress={()=>handleDateChange('prev')}>
            <S.SelectIcon name='chevron-left'/>
          </S.ButtonMontSelect>
          <S.Month>{currentMont}, {currentYear}</S.Month>
          <S.ButtonMontSelect activeOpacity={0.7} onPress={()=>handleDateChange('next')}>
            <S.SelectIcon name='chevron-right'/>
          </S.ButtonMontSelect>
        </S.MonthSelect>

        <S.ChartContainer>
          {
            categoriesExpensives.length > 0  ?
            <>
            <PieChart 
            widthAndHeight={RFValue(250)} 
            series={categoriesExpensives.map(category=>category.percent)} 
            sliceColor={categoriesExpensives.map(category=>category.color)} />
            </>
            :
            <Text>Não ha compras neste mes</Text>  
          }
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
      </ScrollView>
    </S.Container>
  );
}