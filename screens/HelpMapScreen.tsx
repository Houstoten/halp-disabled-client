import * as Location from 'expo-location'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { FAB } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'
import { RequestStatusHandler } from '../components/RequestStatusHandler'
import { View } from '../components/Themed'
import {
    IncomingRequestSubscription,
    OutcomingRequestAcceptedAction,
    useIncomingRequestSubscription,
    useMeQuery,
    useOutcomingRequestAcceptedSubscription,
    useUpdatePositionMutation,
} from '../graphql/generated/graphql'
import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'
import { RootTabScreenProps } from '../types'

export default function HelpMapScreen({
    navigation,
}: RootTabScreenProps<'Help Map'>) {
    const { data } = useMeQuery()
    const colorMode = useColorScheme()
    const requestCtx = useRequestCtx()
    const [updateLocation] = useUpdatePositionMutation()
    const [pendingRequests, setPendingRequest] = useState<
        Array<IncomingRequestSubscription['incomingRequest']>
    >([])
    const [helper, setHelper] = useState<OutcomingRequestAcceptedAction>()

    useOutcomingRequestAcceptedSubscription({
        skip: !data?.me?.id || !data?.me?.is_disabled,
        onSubscriptionData({ subscriptionData }) {
            if (subscriptionData.data?.outcomingRequestAccepted) {
                requestCtx.update({
                    status: RequestStatus.ONGOING,
                    requestId:
                        subscriptionData.data?.outcomingRequestAccepted
                            .requestId,
                })
                setHelper(subscriptionData.data.outcomingRequestAccepted)
            }
        },
    })

    useIncomingRequestSubscription({
        skip: !data?.me?.id || data?.me?.is_disabled,
        onSubscriptionData({ subscriptionData }) {
            setPendingRequest((pendingRequests) =>
                pendingRequests
                    .concat(subscriptionData?.data?.incomingRequest as any)
                    .filter(Boolean)
            )
        },
    })

    useEffect(() => {
        Location.requestForegroundPermissionsAsync()
    }, [])

    if (!data?.me) {
        return <View style={styles.container} />
    }

    const isDisabledUser = data.me.is_disabled

    return (
        <View style={styles.container}>
            <MapView
                loadingEnabled
                followsUserLocation
                showsUserLocation
                showsMyLocationButton
                userInterfaceStyle={colorMode === 'dark' ? 'dark' : 'light'}
                style={StyleSheet.absoluteFill}
                onUserLocationChange={(location) => {
                    const { latitude, longitude } =
                        location.nativeEvent.coordinate

                    updateLocation({
                        variables: {
                            updatePositionInput: { latitude, longitude },
                        },
                    })
                }}
            >
                {pendingRequests.map((req) => (
                    <Marker
                        key={req.request.id}
                        coordinate={{
                            latitude: req.location.latitude,
                            longitude: req.location.longitude,
                        }}
                        onPress={() => {
                            navigation.navigate(
                                'RequestInfoModal',
                                req.request as any
                            )
                        }}
                    />
                ))}
                {helper && (
                    <Marker
                        coordinate={helper.acceptorLocation}
                        pinColor="blue"
                    />
                )}
            </MapView>

            {isDisabledUser && (
                <FAB
                    title="Help"
                    placement="right"
                    color="red"
                    containerStyle={styles.helpContainer}
                    titleStyle={styles.helpTitle}
                    buttonStyle={styles.helpButton}
                    onPress={() => navigation.navigate('HelpModal')}
                />
            )}

            <RequestStatusHandler
                isDisabledUser={isDisabledUser}
                updateHelper={setHelper}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
    },
})
