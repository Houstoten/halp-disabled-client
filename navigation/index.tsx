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
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import TabOneScreen from '../screens/TabOneScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import { RootDrawerScreens, RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import LoginScreen from './LoginScreen'

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName
}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
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
                <Stack.Screen name="Modal" component={ModalScreen} />
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
            <Drawer.Screen name="Help Map" component={TabTwoScreen} />
            <Drawer.Screen name="Account" component={TabOneScreen} />
        </Drawer.Navigator>
    )
}
