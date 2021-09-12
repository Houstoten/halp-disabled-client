import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Avatar, FAB, Switch, Text } from 'react-native-elements'
import { View } from '../components/Themed'
import {
    IncomingRequestSubscription,
    useAcceptRequestMutation,
} from '../graphql/generated/graphql'
import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'

export default function RequestInfoModal({ route, navigation }: any) {
    const payload: IncomingRequestSubscription['incomingRequest'] = route.params

    const { update } = useRequestCtx()
    const [acceptMutation] = useAcceptRequestMutation({
        onCompleted() {
            update({
                status: RequestStatus.ONGOING,
                requestId: payload.request.id,
            })
            navigation.navigate('Root', { screen: 'Help Map' })
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Avatar
                    title={payload.requestor.name}
                    rounded
                    size="xlarge"
                    source={{
                        uri: payload.requestor.avatar,
                    }}
                />
                <Text h3>{payload.requestor.name}</Text>
            </View>

            <Text style={{ fontWeight: '500', fontSize: 19 }}>
                {payload.request.description}
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 100,
                }}
            >
                <Text style={{ fontSize: 18 }}>
                    {payload.request.inplace
                        ? 'Help in place'
                        : 'Takeaway task'}
                </Text>
                <Switch
                    value={payload.request.inplace}
                    disabled
                    color="green"
                    style={{ marginLeft: 20 }}
                />
            </View>

            <FAB
                title="Accept"
                placement="right"
                color="green"
                containerStyle={styles.helpContainer}
                titleStyle={styles.helpTitle}
                buttonStyle={styles.helpButton}
                onPress={() =>
                    acceptMutation({
                        variables: {
                            acceptRequestInput: {
                                requestId: payload.request.id,
                            },
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
    avatar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80,
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
