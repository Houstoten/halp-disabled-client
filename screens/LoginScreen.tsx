import * as Google from 'expo-google-app-auth'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { LoginButton } from '../components/LoginButton'
import { View } from '../components/Themed'
import { useLoginMutation } from '../graphql/generated/graphql'

export default function LoginScreen() {
    const [login, { loading }] = useLoginMutation()

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
            <LoginButton onClick={onLoginClick} loading={loading} />
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
