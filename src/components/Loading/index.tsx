import { ActivityIndicator } from "react-native";
import * as S from './styles'
export function Loading() {
	return (
		<S.Container>
		<ActivityIndicator  color='red' size={'large'}/>
		</S.Container>
	)
}