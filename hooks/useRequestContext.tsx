import React, {
    createContext,
    FC,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react'

export enum RequestStatus {
    PENDING = 'PENDING',
    ONGOING = 'ONGOING',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

export type RequestContextType = {
    value: Partial<{
        status: RequestStatus
        requestId: string
    }>
    update: (data: RequestContextType['value']) => void
}

export const RequestContext = createContext<RequestContextType>({
    value: {},
    update: () => {},
})

export const RequestContextProvider: FC = ({ children }) => {
    const [value, setValue] = useState<RequestContextType['value']>({})

    const update: RequestContextType['update'] = useCallback((data) => {
        setValue((value) => ({ ...value, ...data }))
    }, [])

    const payload = useMemo(() => ({ value, update }), [value, update])

    return (
        <RequestContext.Provider value={payload}>
            {children}
        </RequestContext.Provider>
    )
}

export const useRequestCtx = () => useContext(RequestContext)
