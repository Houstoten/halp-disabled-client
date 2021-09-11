import * as React from 'react'
import { Button } from 'react-native-elements'
import { useLogoutMutation } from '../graphql/generated/graphql'

export function LogoutButton() {
    const [logout, { loading }] = useLogoutMutation()

    return (
        <Button
            loading={loading}
            style={{ width: 120 }}
            title="Logout"
            onPress={() => logout({ refetchQueries: ['me'] })}
        />
    )
}
