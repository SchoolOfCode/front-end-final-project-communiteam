import React from 'react'
import Head from 'next/head'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import { useSearchContext } from '../contexts/search'

// COMPONENTS
import ButtonGeneral from '../components/Button/Button'
import Countdown from '../components/Countdown2'
import styles from '../styles/index.module.css'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import { useStyles } from '../styles/index'
import { serverUrl } from '../environment'
import { DateTime } from 'luxon'
import EventsList from '../components/EventsList'

function Home({ events, nextEvent }) {
    const { discoverRef } = useSearchContext()
    const classes = useStyles()

    function convertDate() {
        const dateFromIso = new DateTime.fromISO(
            `${nextEvent.date}T${nextEvent.time}.000Z`
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

    function shortenDescription() {
        if (!nextEvent.description) {
            return '...'
        }
        const descArray = nextEvent?.description.split('')
        if (descArray.length < 400) {
            return unified()
                .use(parse)
                .use(remark2react)
                .processSync(nextEvent.description).result
        }
        let shortDesc = descArray?.splice(0, 400)
        shortDesc = shortDesc?.join('').trim()
        shortDesc += '...'
        return unified().use(parse).use(remark2react).processSync(shortDesc)
            .result
    }

    return (
        <article className={styles.background}>
            <Head>
                <title>eVenture</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className={styles.contrastBackground}>
                <div className={styles.heading}>
                    <img src="/rocket.png" className={styles.rocket} />
                    <h4 style={{ fontFamily: 'Poppins', margin: '0 0 1rem 0' }}>
                        Discover A World Of Events
                    </h4>
                    <h4
                        style={{
                            fontFamily: 'Nanum Pen Script',
                            color: 'white',
                            margin: '0'
                        }}
                    >
                        With School Of Code
                    </h4>
                    <div className={styles.slidingVertical}>
                        <span id={styles.develop}>Develop</span>
                        <span id={styles.learn}>Learn</span>
                        <span id={styles.grow}>Grow</span>
                    </div>
                </div>
            </section>
            <section className={styles.div}>
                <div className={styles.imageContainer}>
                    <img
                        src="SoC-other.jpg"
                        className={styles.img}
                        alt="Cohort 4 on Zoom"
                    />
                </div>
                <div className={styles.event}>
                    <Typography variant="h5" className={classes.featured}>
                        Featured Event
                    </Typography>
                    <Typography variant="h4" className={classes.title}>
                        {nextEvent.title}
                    </Typography>
                    <Typography variant="h5">
                        <span className={styles.date}>{convertDate()}</span>
                    </Typography>
                    <div className={styles.countdown}>
                        {nextEvent.date && (
                            <Countdown
                                eventDate={nextEvent.date}
                                eventTime={nextEvent.time}
                                className={styles.countdown}
                            />
                        )}
                    </div>
                    <p className={styles.description}>{shortenDescription()}</p>
                    <Link href={`/event/${nextEvent.id}`}>
                        <ButtonGeneral
                            text={'FIND OUT MORE'}
                            style={{ width: '8rem' }}
                        />
                    </Link>
                </div>
            </section>
            <section className={styles.eventsList} ref={discoverRef}>
                <Typography
                    variant="h3"
                    style={{ width: '75%', margin: 'auto', textAlign: 'left' }}
                >
                    Discover More Online Events
                </Typography>
                <EventsList events={events} />
            </section>
        </article>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${serverUrl}/events/date`)
    const { payload } = await res.json()
    const upcomingEvents = payload
    return { props: { events: upcomingEvents, nextEvent: upcomingEvents[0] } }
}

export default Home
