import { RequestStatus, useRequestCtx } from '../hooks/useRequestContext'

export const RequestStatusHandler = ({
    isDisabledUser,
}: {
    isDisabledUser: boolean
}) => {
    const request = useRequestCtx()

    if (!request.value.status) {
        return null
    }

    const requestToComponent: Record<RequestStatus, React.ReactElement> = {
        PENDING: <></>,
        ONGOING: <></>,
        COMPLETED: <></>,
        CANCELLED: <></>,
    }

    return requestToComponent[request.value.status]
}
