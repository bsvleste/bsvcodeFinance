import React from 'react'
import * as S from './styles'
import { HistoryCard } from '../../components/HistoryCard';
export function Resume(){
  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      <HistoryCard color='attention' title='Pizza' amount="1200" />
      <HistoryCard color='attention' title='Pizza' amount="1200" />
      <HistoryCard color='attention' title='Pizza' amount="1200" />
    </S.Container>
  );
}