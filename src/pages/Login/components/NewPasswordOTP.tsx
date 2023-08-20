import { DialogContent, Typography } from '@material-ui/core';
import { CircularProgress, FormHelperText, Grid, InputAdornment } from '@mui/material';
import '../styles.css';
import { useNewPasswordContext } from '../../../context/newPasswordContext';
import { useRef, useState } from 'react';
import CustomTextField from '../../../components/CustomTextField';
import { sendOtpAPI, validateOtpAPI } from '../../../services/util.services';
import { useStyles } from '../PassRecover/styles';
import CheckIcon from '@mui/icons-material/Check';



const NewPasswordOTP = () => {
  const classes = useStyles();
  const {
    addPasswordErrors,
    addNewPassword,
    newPassword,
    passwordError
  } = useNewPasswordContext()

  const refOTP : any = useRef()

  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [checkOTP, setCheckOTP] = useState(false);

  const resendOTP = () => {
    sendOtpAPI(newPassword?.email).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const errorValidation = (event: any) => {


    addNewPassword({ ...newPassword, otp: event.target.value })

    if (event.target.value.length === 4) {
      setLoading(true)
      validateOtpAPI(newPassword?.email, event.target.value).then(res => {
        setCheckOTP(true);
        addPasswordErrors({ ...passwordError, [event.target.name]: '' });
      }).catch(err => {
        addPasswordErrors({ ...passwordError, [event.target.name]: "OTP Inválido" });
        setCheckOTP(false);
      }).finally(()=>{
        setLoading(false)
      })
    }
    else {
      addPasswordErrors({ ...passwordError, [event.target.name]: `O OTP deve possuír 4 números`})
    }
  }

  return (
    <>
      <DialogContent className={classes.dialogContentContainer}>
        <Typography
          variant="subtitle1"
          className={classes.subTitleStepper}
        >
          Digite a chave OTP recebida via e-mail:
        </Typography>

        <Grid container spacing={3} justifyContent='center'>

          <Grid item md={12} xs={12}>
            <CustomTextField
              label='OTP'
              style={{ fontSize: '4rem !important' }}
              autoFocus
              name="otp"
              inputRef={refOTP}
              type="standard"
              fullWidth
              disabled={loading}
              value={newPassword.otp}
              onChange={errorValidation}
              error={!!passwordError.otp}
              inputProps={{ maxLength: 5, style: { fontSize: '4rem', textAlign: 'center' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading
                      ? <CircularProgress style={{ width: '30px', height: '30px', margin: '10px', color: '#e5e8eb' }} />
                      : checkOTP && <CheckIcon style={{ color: '#449364' }} />
                    }
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
          {passwordError.otp}
        </FormHelperText>

          <Typography
          onClick={resendOTP}
            variant="subtitle1"
            style={{ marginTop: '1rem', fontWeight: '500', color: '#001D36', cursor: 'pointer' }}
          >
            Reenviar OTP({timer}s)
          </Typography>
      </DialogContent>
    </>
  );
};
export default NewPasswordOTP;
