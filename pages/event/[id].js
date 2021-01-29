import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { DateTime } from 'luxon'
import { useStyles } from '../../styles/specificeventMaterialcss'
import Typography from '@material-ui/core/Typography'
import EventDisplay from '../../components/EventDisplay'
import EventForm from '../../components/EventForm'
import styles from '../../styles/event.module.css'

import { useAuth0 } from '@auth0/auth0-react'

// ENVIRONMENT VARIABLES
import { serverUrl } from '../../environment'

export default function SpecificEventPage({ event, ticketCount }) {
    const [editing, setEditing] = useState(false)
    const {
        user,
        isAuthenticated,
        getAccessTokenSilently,
        loginWithRedirect
    } = useAuth0()

    const [availableTickets, setAvailableTickets] = useState(
        event.numtickets - ticketCount
    )
    const [title, setTitle] = useState(event.title)
    const [date, setDate] = useState(event.date)
    const [timeObj, setTime] = useState(DateTime.fromSQL(event.time))
    const [description, setDescription] = useState(event.description)
    const [speaker, setSpeaker] = useState(event.speaker)
    const [location, setLocation] = useState(event.location)
    const [numtickets, setNumTickets] = useState(event.numtickets)
    const [eventAttendeeCount, setEventAttendeeCount] = useState(ticketCount)
    const [previewSource, setPreviewSource] = useState(event.banner)
    const [isRegistered, setIsRegistered] = useState(false)

    const router = useRouter()
    const refreshData = () => router.replace(router.asPath)

    useEffect(() => {
        async function getIsRegistered() {
            if (!user) {
                return
            }
            const accessToken = await getAccessTokenSilently()
            const requestOptions = {
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }

            const res = await fetch(
                `${serverUrl}/prot/tickets?email=${user.email}`,
                requestOptions
            )
            const { payload } = await res.json()
            const ticketExists = payload.find(
                (e) =>
                    e.event_id === event.id && user.email === e.attendee_email
            )
            setIsRegistered(ticketExists)
        }
        getIsRegistered()
    }, [])

    const handleDateChange = (d) => {
        //This function handles correct time conversion from object to ISO
        setDate(DateTime.utc(d.c.year, d.c.month, d.c.day).toISODate())
    }

    const handleTimeChange = (t) => {
        //This function handles correct time conversion from object to ISO
        console.log(
            DateTime.utc()
                .set({
                    hour: t.c.hour,
                    minute: t.c.minute,
                    seconds: 0,
                    milliseconds: 0
                })
                .toISOTime({
                    suppressSeconds: true,
                    includeOffset: false,
                    suppressMilliseconds: true
                })
        )

        setTime(
            DateTime.utc().set({
                hour: t.c.hour,
                minute: t.c.minute,
                seconds: 0,
                millisecond: 0
            })
        )
    }

    const classes = useStyles()

    /* -----------------------------------------------------------IMAGE UPLOADER FUNCTIONS---------------------------------------------------- */

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewImage(file)
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
        updateEventDetails(previewSource)
        setPreviewSource(null)
        setEditing(false)
        e.target.reset()
    }

    async function updateEventDetails(base64EncodedImage) {
        if (user && isAuthenticated) {
            const accessToken = await getAccessTokenSilently()

            const time = timeObj.toISOTime({
                suppressSeconds: true,
                includeOffset: false,
                suppressMilliseconds: true
            })

            const requestOptions = {
                mode: 'cors',
                method: 'PATCH',
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

            const response = await fetch(
                `${serverUrl}/org/${event.id}`,
                requestOptions
            ) //post request is sent to events listing
            const data = await response.json()
            console.log({ data })
            setEditing(false)
            refreshData()
        }
    }

    async function deleteEvent() {
        const accessToken = await getAccessTokenSilently()

        const requestOptions = {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        const response = await fetch(
            `${serverUrl}/org/${event.id}`,
            requestOptions
        )
        console.log(response)
        window.location.href = '/'
    }

    async function bookTicket() {
        if (availableTickets > 0) {
            const accessToken = await getAccessTokenSilently()

            const requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ attendeeEmail: user.email })
            }

            const response = await fetch(
                `${serverUrl}/prot/${event.id}/tickets`,
                requestOptions
            )
            const result = await response.json()
            console.log(result)
        }
        setAvailableTickets(availableTickets - 1)
    }

    async function deleteTicket() {
        const accessToken = await getAccessTokenSilently()
        const requestOptions = {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        await fetch(
            `${serverUrl}/prot/${event.id}/tickets?email=${user.email}`,
            requestOptions
        )
    }

    function handleClickForTicket() {
        if (!isRegistered) {
            if (user) {
                bookTicket()
                setIsRegistered(true)
                setEventAttendeeCount(parseInt(eventAttendeeCount) + 1)
            }
            if (!user) {
                loginWithRedirect()
            }
            return
        }
        deleteTicket()
        setIsRegistered(false)
        setEventAttendeeCount(parseInt(eventAttendeeCount) - 1)
    }

    function convertDate() {
        const dateFromIso = new DateTime.fromISO(
            `${event.date}T${event.time}.000Z`
        )
        const localeDate = dateFromIso.toLocaleString({
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
        return localeDate
    }

    return (
        <React.Fragment>
            <div className={styles.contrastBackground}>
                <Typography variant="h2">Attend An Event</Typography>
            </div>
            {!editing ? (
                <EventDisplay
                    event={event}
                    user={user}
                    deleteEvent={deleteEvent}
                    convertDate={convertDate}
                    handleClickForTicket={handleClickForTicket}
                    setEditing={setEditing}
                    isRegistered={isRegistered}
                    availableTickets={availableTickets}
                    ticketCount={ticketCount}
                    numtickets={numtickets}
                    eventAttendeeCount={eventAttendeeCount}
                />
            ) : (
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
                    setEditing={setEditing}
                    setPreviewSource={setPreviewSource}
                />
            )}
        </React.Fragment>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query
    const res = await fetch(`${serverUrl}/events/${id}`)
    const data = await res.json()
    const event = data.payload.event
    const ticketCount = data.payload.ticketCount.count
    return { props: { event, ticketCount } }
}
