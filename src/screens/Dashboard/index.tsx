
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { HighlightCard } from '../../components/HighlightCard'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import *  as S from './styles'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Loading } from '../../components/Loading'

export interface DataListProps extends TransactionCardProps {
	id: string
}
interface HighlightCardsProps{
	amount:string
	lastTransaction:string

}
interface HighlightCardsData{
	entries:HighlightCardsProps
	expensives:HighlightCardsProps
	total:HighlightCardsProps
}
export function Dashboard() {
	const [data,setData] = useState<DataListProps[]| null>([])
	const [isLoading,setIsLaoding] = useState(true)
	const collectionKey = '@bsvcodeFinance:transactions'
	const { colors } = useTheme()
	const [highlightCards,setHighlightCards] = useState<HighlightCardsData>({}as HighlightCardsData)
	
	async function removeAll(){
		await AsyncStorage.removeItem(collectionKey)
	}
	function getLastTransactionDate(collection:DataListProps[],type:"up"| 'down'){
		const lastTransaction = new Date( Math.max.apply(Math,
			collection
			.filter(transaction => transaction.type === type)
			.map(transaction => new Date(transaction.date).getTime())
			))
		return  `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString("pt-BR",{
			month: "long"
		})}` 
	}
	async function loadTransactions(){
		let entriesTotal = 0;
		let expensiveTotal = 0;
		const response = await AsyncStorage.getItem(collectionKey)
		const transactions = response? JSON.parse(response): []
		const transactionsFormatted:DataListProps[] = transactions
		.map((item:DataListProps)=>{			
			if(item.type === 'up'){
				entriesTotal += Number(item.amount)
			}else{
				expensiveTotal += Number(item.amount)
			}

			const amount = Number(item.amount).toLocaleString('pt-BR', {
				style: 'currency',
        currency: 'BRL',
			})
			const dateFormatted = Intl.DateTimeFormat('pt-BR',{
				day:'2-digit',
				month:'2-digit',
        year:'2-digit'
			}).format(new Date(item.date))
			return {
			id:item.id,
			title:item.title,
			amount,
      type:item.type,
			date:dateFormatted,
			category:item.category,
		}
	})
	setData(transactionsFormatted)
	
	const lastTransactionsEntrie = getLastTransactionDate(transactions,'up')
	const lastTransactionsExpensives = getLastTransactionDate(transactions,'down')
	const totalInterval = `01 á ${lastTransactionsExpensives}`
	const total = entriesTotal - expensiveTotal
		setHighlightCards({
			entries:{
				amount:entriesTotal.toLocaleString("pt-BR",{
					style:"currency",
					currency:'BRL'
				}),
				lastTransaction:`Ultimda entrada ${lastTransactionsEntrie}`
			},
			expensives:{
				amount:expensiveTotal.toLocaleString("pt-BR",{
					style:"currency",
					currency:'BRL'
				}),
				lastTransaction:`Ultima saida ${lastTransactionsExpensives}`				
			},
			total:{
				amount: total.toLocaleString("pt-BR",{
					style:"currency",
					currency:'BRL'
				}),
				lastTransaction:totalInterval
			}
		})
		
		setIsLaoding(false)
	}
	
	useEffect(()=>{
		loadTransactions()
	},[])
	useFocusEffect(useCallback(()=>{
		loadTransactions();
	},[]))
	return (
		<S.Container>
		{
			isLoading ?<Loading />:
		<>
			<S.Header>
				<S.UserWrapper>
					<S.UserProfile>
						<S.Photo source={{ uri: "https://github.com/bsvleste.png" }} />
						<S.User>
							<S.UserGreeting>Ola,</S.UserGreeting>
							<S.UserName>Bruno</S.UserName>
						</S.User>
					</S.UserProfile>
					<TouchableOpacity>
						<FontAwesome name="power-off" size={RFValue(30)} color={colors.attention} />
					</TouchableOpacity>
				</S.UserWrapper>
			</S.Header>
			<S.HighlightCards>
				<HighlightCard type="up" title='Entrada' amount={highlightCards.entries?.amount} lastTransaction={highlightCards.entries.lastTransaction} />
				<HighlightCard type="down" title='Saida' amount={highlightCards.expensives?.amount} lastTransaction={highlightCards.expensives.lastTransaction} />
				<HighlightCard type="total" title='Total' amount={highlightCards.total?.amount} lastTransaction={highlightCards.total.lastTransaction} />
			</S.HighlightCards>
			<S.Transaction>
				<S.Title>Listagens</S.Title>
				<S.TransactionList
					data={data}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <TransactionCard data={item}
					/>}
				/>
			</S.Transaction>
			</>
			}
		</S.Container>
	)
}