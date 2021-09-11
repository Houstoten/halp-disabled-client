import * as React from 'react'
import { StyleSheet } from 'react-native'
import { View } from '../components/Themed'
import { LogoutButton } from '../navigation/LoginScreen'
import { RootTabScreenProps } from '../types'

export default function TabOneScreen({
    navigation,
}: RootTabScreenProps<'TabOne'>) {
    return (
        <View style={styles.container}>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
