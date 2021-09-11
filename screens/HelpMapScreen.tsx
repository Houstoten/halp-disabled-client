import * as Location from 'expo-location'
import * as React from 'react'
import { useEffect } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { FAB } from 'react-native-elements'
import MapView from 'react-native-maps'
import { View } from '../components/Themed'
import {
    useMeQuery,
    useUpdatePositionMutation,
} from '../graphql/generated/graphql'

export default function HelpMapScreen() {
    const { data } = useMeQuery()
    const [updateLocation] = useUpdatePositionMutation()
    const colorMode = useColorScheme()

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
                    containerStyle={{ width: '100%' }}
                    titleStyle={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 25,
                    }}
                    buttonStyle={{
                        height: 55,
                    }}
                />
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    helpButton: {
        color: 'white',
    },
    container: {
        flex: 1,
    },
})
