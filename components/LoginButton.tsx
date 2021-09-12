import React from 'react'
import { SocialIcon } from 'react-native-elements'

export const LoginButton = ({
    onClick,
    loading,
}: {
    onClick: () => void
    loading: boolean
}) => {
    return (
        <SocialIcon
            button
            disabled={loading}
            type="google"
            title="Signin with Google"
            fontStyle={{ fontSize: 16 }}
            style={{ width: 250 }}
            onPress={onClick}
        />
    )
}
