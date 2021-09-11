import React from 'react'
import { SocialIcon } from 'react-native-elements'

export const LoginComponent = ({
    onClick,
    loading,
}: {
    onClick: () => void
    loading: boolean
}) => {
    return (
        <SocialIcon
            button
            loading={loading}
            type="google"
            title="Signin with Google"
            fontStyle={{ fontSize: 16 }}
            style={{ width: 220 }}
            onPress={onClick}
        />
    )
}
