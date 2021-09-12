import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import { RequestContext } from './hooks/useRequestContext'
import Navigation from './navigation'

const client = new ApolloClient({
    uri: 'http://192.168.0.220:3001/graphql',
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
                        <RequestContext.Provider value={{}}>
                            <Navigation colorScheme={colorScheme} />
                        </RequestContext.Provider>
                        <StatusBar />
                    </ThemeProvider>
                </SafeAreaProvider>
            </ApolloProvider>
        )
    }
}
