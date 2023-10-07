import { StatusBar } from 'expo-status-bar';
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins'
import { Dashboard } from './src/screens/Dashboard';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import { Loading } from './src/components/Loading';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/routes/app.routes';
export default function App() {
  const [fonstLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  if (!fonstLoaded) return <Loading />
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppRoutes/>
      </NavigationContainer>
    </ThemeProvider>

  );
}
