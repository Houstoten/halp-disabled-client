import * as Location from 'expo-location'
import * as React from 'react'
import { useEffect } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { Button } from 'react-native-elements'
import MapView from 'react-native-maps'
import { View } from '../components/Themed'
import { useUpdatePositionMutation } from '../graphql/generated/graphql'

export default function TabTwoScreen() {
    const [updateLocation, { data }] = useUpdatePositionMutation()
    const colorMode = useColorScheme()

    useEffect(() => {
        Location.requestForegroundPermissionsAsync()
    }, [])

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <MapView
                loadingEnabled
                followsUserLocation
                showsUserLocation
                showsMyLocationButton
                userInterfaceStyle={colorMode === 'dark' ? 'dark' : 'light'}
                style={StyleSheet.absoluteFillObject}
                onUserLocationChange={(location) => {
                    const { latitude, longitude } =
                        location.nativeEvent.coordinate

                    updateLocation({
                        variables: {
                            updatePositionInput: { latitude, longitude },
                        },
                    })
                }}
            ></MapView>
            <Button style={styles.helpButton}>Help</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    absoluteFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    helpButton: {
        height: 100,
        width: 100,
        position: 'absolute',
        bottom: 500,
        right: 500,
    },
})
