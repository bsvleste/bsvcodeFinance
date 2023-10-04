import React from 'react'
import * as S from './styles'
import { categories } from '../../util/categories'

export interface TransactionCardProps {
  title: string,
  amount: string,
  category: string,
  date: string,
  type: "positive" | "negative"
}
interface Props {
  data: TransactionCardProps
}
export function TransactionCard({ data }: Props) {
  const [category] = categories.filter(
    item => item.key === data.category
  );
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>
      <S.Amount type={data.type}>
        {data.type === "negative" && "- "}{data.amount}</S.Amount>
      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}