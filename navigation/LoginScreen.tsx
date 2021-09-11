import * as Google from 'expo-google-app-auth'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { LoginComponent } from '../components/LoginComponent'
import { View } from '../components/Themed'
import { useLoginMutation } from '../graphql/generated/graphql'

export default function LoginScreen() {
    const [login, { loading, data }] = useLoginMutation()

    console.log({ data228: data })

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
