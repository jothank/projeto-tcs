import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
      marginTop: '0.5rem',
    },
    dropZoneContainer: {
      height: '200px',
      minHeight: '200px',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '0.5rem',
    },
    textContainer: {
      height: '60px',
      minHeight: '60px',
      textAlign: 'center',
    },
    text: {
      fontSize: '1rem',
      color: theme.palette.text.secondary,
      marginTop: '14px',
    },
    grey: {
      color: theme.palette.text.secondary,
    },
    icon: {
      color: '#103861',
      width: '50px',
      height: '50px',
    },
    errorMessage: {
      fontSize: '0.8rem',
      margin: '3px 0 0 21px',
    },
  }),
);

export default useStyles;
