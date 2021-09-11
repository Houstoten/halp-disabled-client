import React from 'react'
import { Button } from 'react-native-elements'

export const LoginComponent = ({
    onClick,
    loading,
}: {
    onClick: () => void
    loading: boolean
}) => {
    return (
        <Button
            loading={loading}
            style={{ width: 120 }}
            title="Google login"
            onPress={onClick}
        />
    )
}
