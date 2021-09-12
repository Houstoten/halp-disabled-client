import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Button, Switch, Text } from 'react-native-elements'
import { View } from '../components/Themed'
import { useAcceptRequestMutation } from '../graphql/generated/graphql'
import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'

export default function RequestInfoModal({ route, navigation }: any) {
    const request = route.params
    const { update } = useRequestCtx()
    const [acceptMutation] = useAcceptRequestMutation({
        onCompleted() {
            update({ status: RequestStatus.ONGOING, requestId: request.id })
            navigation.navigate('Root', { screen: 'Help Map' })
        },
    })

    return (
        <View style={styles.container}>
            <Text>{request.description}</Text>
            <Switch value={request.inplace} disabled />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <Button
                title="Accept"
                onPress={() => {
                    acceptMutation({
                        variables: {
                            acceptRequestInput: {
                                requestId: request.id,
                            },
                        },
                    })
                }}
            />
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
