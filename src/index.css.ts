import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

export const tokenInputStyle = Styles.style({
    width: 160,
    $nest: {
        '> * > *': {
          margin: '0 !important',
          padding: '0 !important'
        },
        '#gridTokenInput': {
            height: 48,
            padding: '0 !important',
            transition: 'none'
        },
        '#btnToken': {
            width: '100% !important',
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: 1.5,
            alignSelf: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            opacity: 1,
            color: Theme.input.fontColor,
            padding: '0.25rem 0.75rem !important'
        },
        '#pnlSelection': {
            height: '100%'
        },
        '#pnlSelection > *': {
            height: '100%'
        },
        '#mdCbToken': {
            minWidth: '160px !important',
            maxWidth: '160px !important',
        },
        '#mdCbToken .modal': {
            minWidth: '160px !important'
        },
    }
})

export const primaryButtonStyle = Styles.style({
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
    verticalAlign: 'middle',
    background: Theme.background.gradient,
    color: '#fff',
    borderRadius: '0.65rem',
    padding: '0.5rem 0.75rem',
    transition: 'background .3s ease',
    opacity: 1,
    $nest: {
        '&:not(.disabled):not(.is-spinning):hover': {
            boxShadow: 'none',
            opacity: .9
        },
        '&:not(.disabled):not(.is-spinning):focus': {
            boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
            opacity: .9
        },
        '&.disabled': {
            opacity: 1,
            color: '#fff',
        },
    }
})