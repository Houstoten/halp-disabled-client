import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Switch } from 'react-native-elements/dist/switch/switch'
import { useEffect } from 'react-native-vector-icons/node_modules/@types/react'
import { View } from '../components/Themed'
import { useCreateRequestMutation } from '../graphql/generated/graphql'
import { RootStackScreenProps } from '../types'

export default function HelpModal({
    navigation,
}: RootStackScreenProps<'HelpModal'>) {
    const [postRequest, { data }] = useCreateRequestMutation()
    const [description, setDescription] = React.useState('')
    const [inplace, setinPlace] = React.useState(true)

    useEffect(() => {
        if (data?.createRequest.success) {
            navigation.push('Root')
        }
    }, [data?.createRequest])

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
