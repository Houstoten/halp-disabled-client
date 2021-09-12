import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
    split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { host } from './constants/Host'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import { RequestContextProvider } from './hooks/useRequestContext'
import Navigation from './navigation'

const wsLink = new WebSocketLink({
    uri: `ws://${host}/graphql`,
    options: {
        reconnect: true,
        lazy: true,
    },
})

const httpLink = createHttpLink({ uri: `http://${host}/graphql` })

const client = new ApolloClient({
    link: split(
        ({ query }) => {
            const { kind, operation }: any = getMainDefinition(query)
            return (
                kind === 'OperationDefinition' && operation === 'subscription'
            )
        },
        wsLink,
        httpLink
    ),
    cache: new InMemoryCache(),
})

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()
    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <ApolloProvider client={client}>
                <SafeAreaProvider>
                    <ThemeProvider useDark={colorScheme === 'dark'}>
                        <RequestContextProvider>
                            <Navigation colorScheme={colorScheme} />
                        </RequestContextProvider>
                        <StatusBar />
                    </ThemeProvider>
                </SafeAreaProvider>
            </ApolloProvider>
        )
    }
}
