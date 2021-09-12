import * as Location from 'expo-location'
import * as React from 'react'
import { useEffect } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { FAB } from 'react-native-elements'
import MapView from 'react-native-maps'
import { RequestStatusHandler } from '../components/RequestStatusHandler'
import { View } from '../components/Themed'
import {
    useIncomingRequestSubscription,
    useMeQuery,
    useUpdatePositionMutation,
} from '../graphql/generated/graphql'
import { RootTabScreenProps } from '../types'

export default function HelpMapScreen({
    navigation,
}: RootTabScreenProps<'Help Map'>) {
    const { data } = useMeQuery()
    const [updateLocation] = useUpdatePositionMutation()
    const colorMode = useColorScheme()
    const requestSubcribtion = useIncomingRequestSubscription({
        skip: !data?.me?.id,
    })

    console.log({ requestSubcribtion })

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
            />

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

            <RequestStatusHandler isDisabledUser={isDisabledUser} />
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
