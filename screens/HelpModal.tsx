import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { FAB, Input, Switch, Text } from 'react-native-elements'
import { View } from '../components/Themed'
import { useCreateRequestMutation } from '../graphql/generated/graphql'
import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'
import { RootStackScreenProps } from '../types'

export default function HelpModal({
    navigation,
}: RootStackScreenProps<'HelpModal'>) {
    const requestCtx = useRequestCtx()
    const [postRequest, { data }] = useCreateRequestMutation()
    const [description, setDescription] = useState(
        'I would appreciate your help as soon as possible'
    )
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
                labelStyle={{ fontSize: 20 }}
                label="Description"
                placeholder="Describe your situation..."
                numberOfLines={4}
                blurOnSubmit
                multiline
                style={{ minHeight: 100, fontWeight: '500', fontSize: 19 }}
                value={description}
                onChangeText={setDescription}
            />

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 100,
                }}
            >
                <Text style={{ fontSize: 18 }}>
                    Help in place? Or takeaway task
                </Text>
                <Switch
                    value={inplace}
                    onValueChange={setinPlace}
                    color="green"
                    style={{ marginLeft: 20 }}
                />
            </View>

            <FAB
                title="Send"
                placement="right"
                color="green"
                containerStyle={styles.helpContainer}
                titleStyle={styles.helpTitle}
                buttonStyle={styles.helpButton}
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
        paddingRight: 5,
        paddingLeft: 5,
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

    helpContainer: {
        width: '100%',
        marginBottom: 20,
    },
    helpTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
    helpButton: {
        height: 55,
    },
})
