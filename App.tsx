import { StatusBar } from 'expo-status-bar';
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins'
import { Dashboard } from './src/screens/Dashboard';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import { Loading } from './src/components/Loading';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';
export default function App() {
  const [fonstLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  if (!fonstLoaded) return <Loading />
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Register/>
    </ThemeProvider>

  );
}
