import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { useTheme } from 'styled-components';
import theme from '../theme';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import{RFValue} from 'react-native-responsive-fontsize'
import { Resume } from '../screens/Resume';
const {Navigator,Screen} = createBottomTabNavigator()

export default function AppRoutes() {
  const{colors} = useTheme()
  return(
    <Navigator 
    screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:theme.colors.secondary,
      tabBarInactiveTintColor:theme.colors.text,
      tabBarLabelPosition:'beside-icon',
      tabBarStyle:{
        paddingVertical:Platform.OS === 'ios'?20:0,
        height: RFValue(48)

      } 
    }}
    >
      <Screen 
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon:({color,size})=>(
            <Feather color={color} name="list" size={size} />
          )
        }}
        />
      <Screen 
        name="Registro" 
        component={Register}
        options={{
          tabBarIcon:({color,size})=>(
            <Feather color={color} name="dollar-sign" size={size} />
          )
        }}
        />
      <Screen 
        name="Resumo" 
        component={Resume}
        options={{
          tabBarIcon:({color,size})=>(
            <Feather color={color} name="pie-chart" size={size} />
          )
        }}
        />
    </Navigator>
  )
}