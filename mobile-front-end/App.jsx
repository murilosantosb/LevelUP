import { QueryClientProvider } from '@tanstack/react-query'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feather from '@expo/vector-icons/Feather'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { queryClient } from './src/services/queryClient'
import { useSession } from './src/hooks/useApi'
import { useNativeQueryEvents } from './src/hooks/useNativeQueryEvents'
import QueryStatus from './src/components/QueryStatus'
import Login from './src/pages/Login'
import Cadastro from './src/pages/Cadastro'
import Feed from './src/pages/Feed'
import Buscar from './src/pages/Buscar'
import Perfil from './src/pages/Perfil'
import Tarefas from './src/pages/Tarefas'
import { colors, styles } from './src/styles/theme'
import { useFonts } from 'expo-font'
import { ActivityIndicator, Text } from 'react-native'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const icons = { Inicio: 'home', Tarefas: 'check-square', Buscar: 'search', Perfil: 'user' }
const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background, card: colors.background, primary: colors.primary, border: colors.border, text: colors.text } }

function MainTabs() {
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontFamily: 'Inter_400Regular', fontSize: 12 },
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border, height: 74 + insets.bottom, paddingTop: 12, paddingBottom: 16 + insets.bottom },
        tabBarIcon: ({ color }) => <Feather name={icons[route.name]} color={color} size={26} />,
      })}>
        <Tab.Screen name="Inicio" component={Feed} options={{ title: 'Home' }} />
        <Tab.Screen name="Tarefas" component={Tarefas} />
        <Tab.Screen name="Buscar" component={Buscar} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

function Navigation() {
  useNativeQueryEvents()
  const session = useSession()
  if (session.isPending || session.isError) return <SafeAreaView style={styles.screen}><QueryStatus query={session} /></SafeAreaView>
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session.data ? <Stack.Screen name="Main" component={MainTabs} /> : <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </>}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  const [loaded, error] = useFonts({
    Inter_400Regular: require('@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'),
    Inter_500Medium: require('@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf'),
    Inter_600SemiBold: require('@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf'),
    Inter_700Bold: require('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
  })
  if (!loaded || error) return <SafeAreaProvider><SafeAreaView style={[styles.screen, styles.center]}>{error ? <Text style={styles.error}>Não foi possível carregar as fontes. Reinicie o aplicativo.</Text> : <ActivityIndicator color={colors.primary} />}</SafeAreaView></SafeAreaProvider>
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
