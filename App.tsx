import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins'
import theme from './src/theme';
import { Loading } from './src/components/Loading';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';

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
        <SignIn />
      </NavigationContainer>
    </ThemeProvider>

  );
}
