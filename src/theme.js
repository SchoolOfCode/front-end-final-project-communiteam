import { Icon } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#62a3ff',
            main: '#1675d1',
            dark: '#004a9f',
            contrastText: '#fff'
        },
        secondary: {
            light: '#88ffff',
            main: '#4dd0e1',
            dark: '#009faf',
            contrastText: '#000'
        },
        third: {
            light: '#318855',
            main: '#31996a',
            dark: '#006a3f',
            contrastText: '#fafafa'
        },
        fourth: {
            dark: '#0063b0',
            main: '#fafafa'
            // light: '#fffde7'
        },
        action: {
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            selected: 'rgba(0, 0, 0, 0.08)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)'
        }
    },
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
        divider: 'rgba(0, 0, 0, 0.12)'
    },
    action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: '0.04',
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12
    },
    typography: {
        htmlFontSize: 16,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontFamily: "'Poppins', 'Helvetica', 'Arial', 'sans-serif'",
            fontWeight: 600,
            fontSize: '6rem',
            lineHeight: 1.167,
            letterSpacing: '-0.01562em',
            color: '#ca535f'
        },
        h2: {
            fontFamily: "'Poppins', 'Helvetica', 'Arial', 'sans-serif'",
            fontWeight: 600,
            fontSize: '3rem',
            lineHeight: 1.2,
            letterSpacing: '-0.00833em',
            color: 'white',
            padding: '4rem'
        },
        h3: {
            fontFamily: "'Poppins', 'Helvetica', 'Arial', 'sans-serif'",
            fontWeight: 600,
            fontSize: '2.25rem',
            lineHeight: 1.167,
            letterSpacing: '0em'
        },
        h4: {
            fontFamily: "'Mulish', 'Helvetica', 'Arial', 'sans-serif'",
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            // padding: '1.1vw 0.5vw 1vw 0.5vw'
            color: '#006'
        },
        h5: {
            fontFamily: "'Mulish', 'Helvetica', 'Arial', 'sans-serif'",
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1,
            // fontWeight: 'bold',
            // letterSpacing: '0.1em',
            color: '#006'
        },
        h6: {
            fontFamily: "'Lato', 'Helvetica', 'Arial', 'sans-serif'",
            fontSize: '1.2rem',
            lineHeight: 1.2,
            fontWeight: '500',
            // letterSpacing: '0.06em',
            color: 'white',
            textShadow: '1px 1px 1px black'
        },
        p1: {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
            fontSize: '4rem',
            lineHeight: 1.2,
            fontWeight: 'bold',
            letterSpacing: '0.06em',
            color: '#006'
            // textShadow: '1px 1px 1px black'
        }
    },
    overrides: {
        MuiIcon: {
            colorPrimary: {
                color: '#0063b0'
            },
            colorSecondary: {
                color: 'black'
            },
            fontSizeSmall: {
                small: '10rem'
            }
            // colorSecondary: 'blue',
            // colorAction: 'green'
        }
    }
})

export default theme
