import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      padding: 0,
    },
    button: {
      marginRight: theme.spacing(1),
    },
    buttonContainer  : {
      display: 'flex', 
      justifyContent: 'end', 
      height: '48px', 
      marginTop: '1rem', 
      marginBottom: '1rem' 

    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    stepper: {
      padding: '0',
    },
    stepperActionsLeft: {
      float: 'left',
      margin: '1em',
    },
    stepperActionsRight: {
      float: 'right',
    },
    stepperItemContainer: {
      padding: '18px',
    },
    root:{
      fill: '#b7b7b7'
    },
    icon:{
      fill:"#09355a !important",
    },
    text:{
      fill:"white !important",
    },
  }),
);

export default useStyles;
