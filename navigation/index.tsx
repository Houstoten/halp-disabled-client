import { createDrawerNavigator } from '@react-navigation/drawer'
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ActivityIndicator, ColorSchemeName } from 'react-native'
import { View } from '../components/Themed'
import { useMeQuery } from '../graphql/generated/graphql'
import TabOneScreen from '../screens/AccountScreen'
import HelpMapScreen from '../screens/HelpMapScreen'
import HelpModal from '../screens/HelpModal'
import LoginScreen from '../screens/LoginScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import RequestInfoModal from '../screens/RequestInfoModal'
import { RootDrawerScreens, RootStackParamList } from '../types'

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName
}) {
    return (
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
    const { data, loading } = useMeQuery()

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        )
    }

    const isLogged = Boolean(data?.me?.id)

    return (
        <Stack.Navigator>
            {isLogged ? (
                <>
                    <Stack.Screen
                        name="Root"
                        component={DrawerNavigation}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="NotFound"
                        component={NotFoundScreen}
                        options={{ title: 'Oops!' }}
                    />
                </>
            ) : (
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'Login' }}
                />
            )}

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="HelpModal"
                    component={HelpModal}
                    options={{ title: 'Ask for help' }}
                />
                <Stack.Screen
                    name="RequestInfoModal"
                    component={RequestInfoModal}
                    options={{ title: 'Request Info' }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator<RootDrawerScreens>()

function DrawerNavigation() {
    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                swipeEnabled: route.name !== 'Help Map',
            })}
        >
            <Drawer.Screen name="Help Map" component={HelpMapScreen} />
            <Drawer.Screen name="Account" component={TabOneScreen} />
        </Drawer.Navigator>
    )
}
