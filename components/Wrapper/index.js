import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Loading from '../Loading/index'

function Wrapper({ children }) {
    const { isLoading, error } = useAuth0()
    if (isLoading) {
        return <Loading />
    }
    if (error) {
        return <div>Oops... {error.message}</div>
    }
    return (
        typeof window === 'undefined'?<Loading />: <>{children}</>
    )
    
        
        
    
}
export default Wrapper
