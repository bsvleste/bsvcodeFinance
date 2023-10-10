import React,{ReactNode} from 'react'
import * as S from './styles'
export interface HighlightCardProps  {
    type: "up" | "down" | "total";
    title: string;
    amount: string;
    lastTransaction: string;
}
const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
};
export function HighlightCard({
    type,
    title,
    amount,
    lastTransaction,
}: HighlightCardProps){  
    return (
        <S.Container type={type}>
            <S.Header>
                <S.Title type={type}>{title}</S.Title>
                <S.Icon name={icon[type]} type={type} />
            </S.Header>
            <S.Footer>
                <S.Amount type={type}>{amount}</S.Amount>
                <S.LastTransaction>{lastTransaction}</S.LastTransaction>
            </S.Footer>
        </S.Container>
    );
}