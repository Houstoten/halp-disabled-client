import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { Switch } from 'react-native-elements/dist/switch/switch'
import { View } from '../components/Themed'

export default function HelpModalScreen() {
    const [description, setDescription] = useState('')
    const [inPlace, setInPlace] = useState(true)

    return (
        <View style={styles.container}>
            <Input
                placeholder="Describe your situation"
                value={description}
                onChangeText={setDescription}
            />
            <Switch value={inPlace} onValueChange={setInPlace} />
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
