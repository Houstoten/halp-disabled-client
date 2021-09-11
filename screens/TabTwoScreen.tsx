import * as Location from 'expo-location'
import * as React from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import MapView from 'react-native-maps'
import { View } from '../components/Themed'

export default function TabTwoScreen() {
    const [location, setLocation] =
        React.useState<Location.LocationObject | null>(null)
    const colorMode = useColorScheme()
    React.useEffect(() => {
        ;(async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }

            const location = await Location.getCurrentPositionAsync({})

            console.log(location)

            setLocation(location)
        })()
    }, [])
    return (
        <View style={styles.container}>
            <MapView
                userInterfaceStyle={colorMode === 'dark' ? 'dark' : 'light'}
                loadingEnabled
                followsUserLocation
                showsUserLocation
                showsMyLocationButton
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
