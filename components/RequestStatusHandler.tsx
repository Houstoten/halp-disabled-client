import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { AirbnbRating, Chip, Overlay } from 'react-native-elements'
import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'
import { View } from './Themed'

export const RequestStatusHandler = ({
    isDisabledUser,
}: {
    isDisabledUser: boolean
}) => {
    const request = useRequestCtx()

    if (!request.value?.status) {
        return null
    }

    const requestToComponent: Record<RequestStatus, React.ReactElement> = {
        PENDING: (
            <View style={styles.topContainer}>
                <Chip
                    title="Pending request"
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['white', 'green'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    style={styles.topContainer}
                    // icon={{
                    //     name: 'bluetooth',
                    //     type: 'font-awesome',
                    //     size: 20,
                    //     color: 'white',
                    // }}
                />
            </View>
        ),
        CANCELLED: (
            <View style={styles.topContainer}>
                <Chip
                    title="Request Cancelled"
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['white', 'red'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    style={styles.topContainer}
                />
            </View>
        ),
        ONGOING: (
            <View style={styles.topContainer}>
                <Chip
                    title="Ongoing request"
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['white', 'red'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    style={styles.topContainer}
                />
            </View>
        ),
        COMPLETED: <RatingOverlay />,
    }

    return requestToComponent[request.value.status]
}

const RatingOverlay = () => {
    const [visible, setVisible] = useState(true)

    return (
        <Overlay
            overlayStyle={styles.ratingContainer}
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
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
