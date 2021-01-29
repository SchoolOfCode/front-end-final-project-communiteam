import React from 'react'
import TextField from '@material-ui/core/TextField'
import LuxonUtils from '@date-io/luxon'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'
import UploadImage from '../../components/ImageUploader/index'
import ButtonGeneral from '../../components/Button/Button'
import styles from './EventForm.module.css'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

import { useStyles } from '../../styles/specificeventMaterialcss'
import { useFormStyles } from './EventFormMaterialCSS'

export default function EventForm({
    handleSubmit,
    handleDateChange,
    handleTimeChange,
    handleFileInputChange,
    title,
    description,
    date,
    time,
    speaker,
    location,
    numtickets,
    previewSource,
    setTitle,
    setDescription,
    setSpeaker,
    setLocation,
    setNumTickets,
    setEditing,
    setPreviewSource,
    buttonState
}) {
    const classes = useStyles()
    const formClasses = useFormStyles()

    return (
        <article className={styles.mainContainer}>
            <form
                autoComplete="off"
                noValidate
                onSubmit={(event) => handleSubmit(event)}
            >
                <section className={styles.card}>
                    <div className={styles.image}>
                        <UploadImage
                            handleFileInputChange={handleFileInputChange}
                            previewSource={previewSource}
                            setPreviewSource={setPreviewSource}
                        />
                    </div>
                    <div className={styles.titleContainer}>
                        <MuiPickersUtilsProvider utils={LuxonUtils}>
                            <Grid
                                container
                                justify="space-around"
                                direction="row"
                                wrap="nowrap"
                            >
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date"
                                    label="Date"
                                    format="dd/MM/yyyy"
                                    value={date}
                                    onChange={(d) => handleDateChange(d)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date'
                                    }}
                                    className={classes.datetime}
                                    disablePast
                                    style={{ margin: '0' }}
                                />

                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time"
                                    label="Time"
                                    value={time}
                                    onChange={(t) => handleTimeChange(t)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time'
                                    }}
                                    className={(classes.datetime, styles.time)}
                                    disablePast
                                    style={{ margin: '0' }}
                                    injectFirst
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <TextField
                            id="title"
                            label="Title"
                            placeholder="Enter title of event"
                            variant="outlined"
                            value={title}
                            InputProps={{
                                classes: { input: classes.title }
                            }}
                            onChange={(e) => setTitle(e.target.value)}
                            helperText={
                                title.length < 1
                                    ? 'Please enter new title'
                                    : ' '
                            }
                        />
                        <TextField
                            id="location"
                            label="Location"
                            value={location}
                            rows={1}
                            placeholder="Enter location of event"
                            variant="outlined"
                            InputProps={{
                                classes: { input: classes.location }
                            }}
                            onChange={(e) => setLocation(e.target.value)}
                            helperText={
                                location.length < 1 ? 'Please enter text' : ' '
                            }
                        />
                    </div>
                </section>
                <section className={styles.actionsBar}>
                    <div className={styles.editDelete}>
                        <IconButton
                            className={formClasses.icons}
                            aria-label="Save"
                            type="submit"
                            disabled={buttonState}
                        >
                            <SaveIcon />
                        </IconButton>
                        <IconButton
                            className={formClasses.icons}
                            aria-label="Cancel"
                            onClick={() => setEditing(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div>
                        <ButtonGeneral
                            disabled
                            style={{
                                width: '20rem',
                                height: '2.5rem',
                                backgroundColor: 'gray'
                            }}
                            text="REGISTER"
                        />
                    </div>
                </section>
                <section className={styles.details}>
                    <div className={styles.description}>
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rows={30}
                            value={description}
                            plceholder="Enter Event Title"
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}
                            InputProps={
                                {
                                    // classes: { input: classes.description }
                                }
                            }
                            helperText={
                                description.length < 1
                                    ? 'Please enter text'
                                    : ' '
                            }
                            classes={formClasses.descriptionMUI}
                            fullWidth={true}
                        />
                    </div>
                    <div className={styles.additionalInfo}>
                        <TextField
                            id="speaker"
                            label="Speaker"
                            rows={2}
                            value={speaker}
                            placeholder="Enter the speakers"
                            variant="outlined"
                            InputProps={{ classes: { input: classes.speaker } }}
                            onChange={(e) => setSpeaker(e.target.value)}
                            helperText={
                                speaker.length < 1 ? 'Please enter text' : ' '
                            }
                        />

                        <TextField
                            className={classes.tickets}
                            id="tickets"
                            label="Tickets"
                            value={numtickets}
                            rows={1}
                            placeholder="Enter number of tickets available"
                            variant="outlined"
                            InputProps={{
                                classes: { input: classes.numtickets }
                            }}
                            onChange={(e) => setNumTickets(e.target.value)}
                            helperText={
                                /^\d+$/.test(numtickets) === false
                                    ? 'Please enter a number'
                                    : ' '
                            }
                        />
                    </div>
                </section>
            </form>
        </article>
    )
}
