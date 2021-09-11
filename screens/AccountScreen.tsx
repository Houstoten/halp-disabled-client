import * as React from 'react'
import { StyleSheet } from 'react-native'
import { LogoutButton } from '../components/LogoutButton'
import { View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

export default function AccountScreen({
    navigation,
}: RootTabScreenProps<'Account'>) {
    return (
        <View style={styles.container}>
            <LogoutButton />
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
