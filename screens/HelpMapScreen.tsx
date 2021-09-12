import * as Location from 'expo-location'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
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
    useRequestStatusApproveSubscription,
    useUpdatePositionMutation,
} from '../graphql/generated/graphql'
import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'
import { RootTabScreenProps } from '../types'

export default function HelpMapScreen({
    navigation,
}: RootTabScreenProps<'Help Map'>) {
    const { data } = useMeQuery()
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

    useRequestStatusApproveSubscription({
        skip: !data?.me?.id || data?.me?.is_disabled,
        onSubscriptionData({ subscriptionData }) {
            setPendingRequest((pendingRequests) =>
                pendingRequests.filter(
                    (r) =>
                        r.request.id !==
                        subscriptionData.data?.requestStatusApprove?.requestId
                )
            )

            requestCtx.update({ status: RequestStatus.COMPLETED })
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
                            navigation.navigate('RequestInfoModal', req as any)
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

            {isDisabledUser &&
                ![RequestStatus.PENDING, RequestStatus.ONGOING].includes(
                    requestCtx?.value?.status as any
                ) && (
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
