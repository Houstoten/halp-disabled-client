import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { AirbnbRating, Chip, Overlay } from 'react-native-elements'
import {
    useApproveRequestMutation,
    useDeclineRequestMutation,
} from '../graphql/generated/graphql'
import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'
import { View } from './Themed'

export const RequestStatusHandler = ({
    isDisabledUser,
    updateHelper,
}: {
    isDisabledUser: boolean
    updateHelper: Function
}) => {
    const request = useRequestCtx()
    const [cancelRequest] = useDeclineRequestMutation({
        onCompleted() {
            request.update({ status: RequestStatus.CANCELLED })
            setTimeout(() => request.update({ status: '' as any }), 5000)
        },
    })
    const [approveRequest] = useApproveRequestMutation({
        onCompleted() {
            request.update({ status: RequestStatus.COMPLETED })
        },
    })

    if (!request.value?.status) {
        return null
    }

    const requestToComponent: Record<RequestStatus, React.ReactElement> = {
        PENDING: (
            <View style={styles.topContainer}>
                <Chip
                    title="Pending request"
                    ViewComponent={LinearGradient}
                    titleStyle={styles.title}
                    linearGradientProps={{
                        colors: ['white', 'green'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    buttonStyle={{ borderRadius: 16 }}
                    icon={{
                        name: 'close-circle-outline',
                        type: 'ionicon',
                        size: 30,
                        color: 'white',
                        onPress: () =>
                            cancelRequest({
                                variables: {
                                    declineRequestInput: {
                                        requestId: request.value
                                            .requestId as any,
                                    },
                                },
                            }),
                    }}
                />
            </View>
        ),
        CANCELLED: (
            <View style={styles.topContainer}>
                <Chip
                    title="Request Cancelled"
                    titleStyle={styles.title}
                    buttonStyle={{ borderRadius: 16 }}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['white', 'red'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                />
            </View>
        ),
        ONGOING: (
            <View style={styles.topContainer}>
                <Chip
                    title="Ongoing request"
                    buttonStyle={{ borderRadius: 16 }}
                    titleStyle={styles.title}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['white', 'blue'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    icon={
                        isDisabledUser && {
                            name: 'checkmark-circle-outline',
                            type: 'ionicon',
                            size: 30,
                            color: 'white',
                            onPress: () => {
                                approveRequest({
                                    variables: {
                                        approveRequestInput: {
                                            requestId: request.value
                                                .requestId as any,
                                        },
                                    },
                                })
                                updateHelper(null)
                            },
                        }
                    }
                />
            </View>
        ),
        COMPLETED: <RatingOverlay isDisabledUser={isDisabledUser} />,
    }

    return requestToComponent[request.value.status]
}

const RatingOverlay = ({ isDisabledUser }: { isDisabledUser: boolean }) => {
    const [visible, setVisible] = useState(true)
    const request = useRequestCtx()

    useEffect(() => {
        if (!isDisabledUser) {
            setTimeout(() => {
                setVisible(false)
                request.update({ requestId: '', status: '' as any })
            }, 5000)
        }
    }, [isDisabledUser])

    if (!isDisabledUser) {
        return visible ? (
            <View style={styles.topContainer}>
                <Chip
                    title="Request Completed"
                    buttonStyle={{ borderRadius: 16 }}
                    titleStyle={styles.title}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['blue', 'green'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                />
            </View>
        ) : null
    }

    return (
        <Overlay
            overlayStyle={styles.ratingContainer}
            isVisible={visible}
            onBackdropPress={() => {
                request.update({ status: '' as any })
                setVisible(false)
            }}
        >
            <AirbnbRating onFinishRating={() => {}} />
        </Overlay>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 10,
        right: 10,
        left: 10,
    },
    ratingContainer: {
        width: '80%',
        height: 140,
        borderRadius: 40,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    helpButton: {
        height: 55,
    },
    container: {
        flex: 1,
    },
})
