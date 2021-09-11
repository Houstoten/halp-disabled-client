import { useApolloClient } from '@apollo/client'
import * as Google from 'expo-google-app-auth'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { LoginComponent } from '../components/LoginComponent'
import { View } from '../components/Themed'
import {
    useLoginMutation,
    useLogoutMutation,
} from '../graphql/generated/graphql'

export function LogoutButton() {
    const [logout, { loading }] = useLogoutMutation()
    const client = useApolloClient()

    return (
        <Button
            loading={loading}
            style={{ width: 120 }}
            title="Logout"
            onPress={() => logout()}
        />
    )
}

export default function LoginScreen() {
    const [login, { loading, data }] = useLoginMutation()

    const onLoginClick = async () => {
        const { accessToken, refreshToken, idToken }: any =
            await Google.logInAsync({
                clientId:
                    '265204013790-b59b6kqoj0j5d4cme3pqd94bvfosudr0.apps.googleusercontent.com',
                scopes: ['profile'],
            })

        login({
            variables: {
                loginInput: { accessToken, refreshToken, idToken },
            },
            refetchQueries: ['me'],
        })
    }

    return (
        <View style={styles.container}>
            <LoginComponent onClick={onLoginClick} loading={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
