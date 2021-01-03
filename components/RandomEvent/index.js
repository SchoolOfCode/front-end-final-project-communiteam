import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

const RandomEvent = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [event, setEvent] = useState(null)

    // console.log('line8')

    useEffect(() => {
        if (user && isAuthenticated) {
            async function getEvent() {
                const accessToken = await getAccessTokenSilently()

                const response = await fetch(`${serverUrl}/protected/1`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                const result = await response.json()

                console.log(result)

                setEvent(result)
            }

            getEvent()
        }
    }, [user, isAuthenticated])

    return <div>hello</div>
}

export default RandomEvent