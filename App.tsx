import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import HubScreen from '@screens/HubScreen'
import HomeScreen from '@screens/HomeScreen'
import NewSessionScreen from '@screens/NewSessionScreen'
import NewInstanceScreen from '@screens/NewInstanceScreen'
import DB from '@modules/DB'
import { IconComponentProvider } from '@react-native-material/core'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Font from 'expo-font'
import { customFonts } from '@modules/AssetPaths'

export type RootStackParamList = {
  Home: undefined,
  Hub: undefined,
  Settings: undefined,
  NewSession: { 
    routineId: number,
    sessionExists: boolean,
    sessionId: number,
    sessionTime: string,
  },
  NewInstance: { 
    sessionId: number,
  },
  NewProgram: undefined,
}

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const Stack = createNativeStackNavigator<RootStackParamList>()

  useEffect(() => {
    const initializeDatabase = async () => {
      return await DB.initDatabase() 
    }

    const loadFonts = async () => {
      return await Font.loadAsync(customFonts) 
    }

    const loadAllAppAssets = async () => {
      try {
        await Promise.all([
          initializeDatabase(),
          loadFonts(),
        ])

        console.log('App Initialized!')
        setIsInitialized(true)
      } catch (error) {
        console.log('Error Initializing: ' + error)
      }
    }

    loadAllAppAssets()
  }, [])

  return isInitialized ? (
    <NavigationContainer>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
            cardStyle: {
              backgroundColor: 'transparent',
            },
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTitleStyle: {
              color: '#F5F6F3',
              fontFamily: 'BaiJamjuree-Bold',
              fontSize: 18,
            },
            headerTintColor: '#F5F6F3',
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
