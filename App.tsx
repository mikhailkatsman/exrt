import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import HubScreen from '@screens/HubScreen'
import HomeScreen from '@screens/HomeScreen'
import NewSessionScreen from '@screens/NewSessionScreen'
import NewInstanceScreen from '@screens/NewInstanceScreen'
import db from '@modules/DB'
import { IconComponentProvider } from '@react-native-material/core'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

export type RootStackParamList = {
  Home: undefined,
  Hub: undefined,
  Settings: undefined,
  NewSession: { routineId: number } | undefined,
  NewInstance: { pickerValues: {}[] } | undefined,
  NewProgram: undefined,
}


const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const Stack = createNativeStackNavigator<RootStackParamList>()

  useEffect(() => {
    db.initDatabase().then(() => setIsInitialized(true))
  }, [])

  return isInitialized ? (
    <NavigationContainer>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
            statusBarHidden: false,
            statusBarColor: '#080B06',
            headerStyle: {
              backgroundColor: '#080B06',
            },
            headerTitleStyle: {
              color: '#F5F6F3',
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerTintColor: '#F5F6F3'
          }}
        >
          <Stack.Screen
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen
            name='Hub'
            component={HubScreen}
            options={{title: 'Hub'}}
          />
          <Stack.Screen
            name='NewSession'
            component={NewSessionScreen}
            options={{title: 'Create New Session'}}
          />
          <Stack.Screen
            name='NewInstance'
            component={NewInstanceScreen}
            options={{title: 'Add New Exercise Instance'}}
          />
        </Stack.Navigator>
      </IconComponentProvider>
    </NavigationContainer>
  ) : (
    <Text>Loading...</Text>
  )
}

export default App
