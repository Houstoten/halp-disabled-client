import { createContext, useContext } from 'react'

export enum RequestStatus {
    PENDING = 'PENDING',
    ONGOING = 'ONGOING',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

export type RequestContextType = Partial<{
    status: RequestStatus
}>

export const RequestContext = createContext<RequestContextType>({})

export const useRequestCtx = () => useContext(RequestContext)
