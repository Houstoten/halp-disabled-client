import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Switch } from 'react-native-elements/dist/switch/switch'
import { View } from '../components/Themed'
import { useCreateRequestMutation } from '../graphql/generated/graphql'
import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'
import { RootStackScreenProps } from '../types'

export default function HelpModal({
    navigation,
}: RootStackScreenProps<'HelpModal'>) {
    const requestCtx = useRequestCtx()
    const [postRequest, { data }] = useCreateRequestMutation()
    const [description, setDescription] = useState('')
    const [inplace, setinPlace] = useState(true)

    useEffect(() => {
        const requestId = data?.createRequest?.requestId
        if (requestId) {
            requestCtx?.update({ status: RequestStatus.PENDING, requestId })
            navigation.navigate('Root', { screen: 'Help Map' })
        }
    }, [data?.createRequest?.requestId])

    return (
        <View style={styles.container}>
            <Input
                placeholder="Describe your situation"
                value={description}
                onChangeText={setDescription}
            />

            <Switch value={inplace} onValueChange={setinPlace} />

            <Button
                title="Send"
                onPress={() =>
                    postRequest({
                        variables: {
                            createRequestInput: { description, inplace },
                        },
                    })
                }
            />
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
