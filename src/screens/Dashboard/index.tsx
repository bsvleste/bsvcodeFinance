
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { HighlightCard } from '../../components/HighlightCard'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import *  as S from './styles'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import { useState } from 'react'

export interface DataListProps extends TransactionCardProps {
	id: string
}
export function Dashboard() {
	const { colors } = useTheme()
	const data: DataListProps[] = [
		{
			id: "1",
			type: "positive",
			title: "Desenvolvimento de site",
			amount: "R$12.500,00",
			category: "purchases",
			date: "13/04/2023"
		},
		{
			id: "2",
			type: "negative",
			title: "Desenvolvimento de App",
			amount: "R$18.500,00",
			category: "salary",
			date: "13/04/2023"
		}
		,
		{
			id: "3",
			type: "negative",
			title: "Casa",
			amount: "R$1.500,00",
			category: "car",
			date: "13/04/2023"
		}
	]
	return (
		<S.Container>
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
				<HighlightCard type="up" title='Entrada' amount='R$14.500,00' lastTransaction='dia 15' />
				<HighlightCard type="down" title='Saida' amount='R$14.500,00' lastTransaction='dia 20' />
				<HighlightCard type="total" title='Total' amount='R$14.500,00' lastTransaction='dia 20' />
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
		</S.Container>
	)
}