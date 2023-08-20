import { DialogContent, Typography } from '@material-ui/core';
import { FormHelperText, IconButton, InputAdornment } from '@mui/material';
import CustomTextField from '../../../components/CustomTextField';
import { useNewUserContext } from '../../../context/newUserContext';
import '../styles.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useCallback, useRef, useState } from 'react';


const UserPasswordData = () => {

  const {
    passwordErrors,
    addPasswordError,
    addNewUserPassword,
    newUserPassword,
  } = useNewUserContext()

  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const passRef: any = useRef();
  const confirmPassRef: any = useRef();


  const errorValidation = useCallback((event: any) => {

    addNewUserPassword({ ...newUserPassword, [event.target.id]: event.target.value })

    const validRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

    if (!event.target.value.match(validRegex) && event.target.id === 'senha') {
      addPasswordError({ ...passwordErrors, senha : "A senha deve conter pelo menos uma letra maiúscula, um caractere especial e ao menos 8 caracteres."});
    }

    else if (passRef.current.value !== confirmPassRef.current.value) {
      addPasswordError({ ...passwordErrors, confirmarSenha : 'As senhas devem ser iguais!', senha: ''});
    }
    else {
      addPasswordError({ ...passwordErrors, confirmarSenha : '', senha : ''});
    }

  }, [newUserPassword, passwordErrors])



  return (
    <DialogContent style={{ padding: 0 }}>
      <Typography
        variant="subtitle1"
        style={{ margin: '2rem 0 1rem', color: '#323232', fontWeight: '600' }}
      >
        Escolha uma senha:
      </Typography>

      <CustomTextField
        style={{ marginTop: '1rem' }}
        id="senha"
        inputRef={passRef}
        name="senha"
        label="Senha"
        autoComplete="off"
        placeholder="Senha"
        size="medium"
        error={!!passwordErrors.senha}
        value={newUserPassword?.senha}
        onChange={errorValidation}
        InputProps={{
          type: showConfirmPass ? 'text' : 'password',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
        {passwordErrors.senha}
      </FormHelperText>

      <CustomTextField
        style={{ marginTop: '1rem' }}
        inputRef={confirmPassRef}
        id="confirmarSenha"
        name="confirmar senha"
        label="Confirmar Senha"
        autoComplete="off"
        placeholder="Confirmar Senha"
        size="medium"
        error={!!passwordErrors.confirmarSenha}
        value={newUserPassword?.confirmarSenha}
        onChange={errorValidation}
        InputProps={{
          type: showConfirmPass ? 'text' : 'password',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
        {passwordErrors.confirmarSenha}
      </FormHelperText>
    </DialogContent>
  );
};
export default UserPasswordData;
