import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { View } from '../components/Themed'

export default function RequestInfoModal() {
    return (
        <View style={styles.container}>
            <Text>Description</Text>
            {/* <Switch value={inPlace} onValueChange={setInPlace} /> */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
