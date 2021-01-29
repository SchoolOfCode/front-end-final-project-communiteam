import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'


import { DateTime } from 'luxon'

import { useStyles } from '../styles/CreateEventMaterialCSS'
import styles from '../styles/create-event.module.css'
import EventForm from '../components/EventForm'

// ENVIRONMENT VARIABLES
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { serverUrl } from '../environment'
import Loading from '../components/Loading/index'
import { Typography } from '@material-ui/core'

function AdminEventPage() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState(DateTime.utc())
    const [timeObj, setTime] = useState(DateTime.utc())

    const [description, setDescription] = useState('')
    const [speaker, setSpeaker] = useState('')
    const [location, setLocation] = useState('')
    const [numtickets, setNumTickets] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const [buttonState, setButtonState] = useState(true)

    const router = useRouter()
    const redirect = () => router.replace('/')

    useEffect(() => {
        user &&
        title &&
        date &&
        timeObj &&
        description &&
        location &&
        speaker &&
        previewSource &&
        numtickets
            ? setButtonState(false)
            : setButtonState(true)
    }, [
        user,
        title,
        date,
        timeObj,
        description,
        location,
        speaker,
        previewSource,
        numtickets
    ])

    const handleDateChange = (d) => {
        //This function handles correct time conversion from object to ISO
        if (d !== null && d.c !== null) {
            setDate(DateTime.utc(d.c.year, d.c.month, d.c.day).toISODate())
        }
    }

    const handleTimeChange = (t) => {
        //This function handles correct time conversion from object to ISO
        if (t !== null && t.c !== null) {
            setTime(
                DateTime.utc().set({
                    hour: t.c.hour,
                    minute: t.c.minute,
                    seconds: 0,
                    millisecond: 0
                })
            )
            console.log(timeObj)
        }
    }

    const classes = useStyles()

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewImage(file)
        //setBanner(file)
    }

    const previewImage = (file) => {
        console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    /* ----------------------------------------------------------------------------------------------------------------------------------------------------- */

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!previewSource) return
        gatherEventDetails(previewSource)
        setPreviewSource(null)
        e.target.reset()
        window.location.href = '/'
    }

    async function gatherEventDetails(base64EncodedImage) {
        if (user && isAuthenticated) {
            const accessToken = await getAccessTokenSilently()

            const time = timeObj.toISOTime({
                suppressSeconds: true,
                includeOffset: false,
                suppressMilliseconds: true
            })

            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    title,
                    date,
                    time,
                    description,
                    speaker,
                    numtickets,
                    location,
                    banner: base64EncodedImage
                })
            }

            const response = await fetch(` ${serverUrl}/org`, requestOptions) //post request is sent to events listing
            const data = await response.json()

            
        }
    }
    if (!Object.values(user)[0][0]) {
        return <Loading />
    }
    return (
        <React.Fragment>
            <div className={styles.contrastBackground}>
                <Typography variant="h2">Create An Event</Typography>
            </div>
            <EventForm
                handleSubmit={handleSubmit}
                handleDateChange={handleDateChange}
                handleTimeChange={handleTimeChange}
                handleFileInputChange={handleFileInputChange}
                setTitle={setTitle}
                title={title}
                description={description}
                date={date}
                time={timeObj}
                speaker={speaker}
                location={location}
                numtickets={numtickets}
                previewSource={previewSource}
                setDescription={setDescription}
                setSpeaker={setSpeaker}
                setLocation={setLocation}
                setNumTickets={setNumTickets}
                setEditing={redirect}
                setPreviewSource={setPreviewSource}
                buttonState={buttonState}
            />
            
        </React.Fragment>
    )
}

export default withAuthenticationRequired(AdminEventPage, {
    onRedirecting: () => <Loading />
})
