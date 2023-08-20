import {
  DialogContent,
  Grid,
  Link,
  Typography,
} from '@mui/material';
// import Timer from 'components/Timer';
import React, { useCallback, useState } from 'react';
import { onlyNumbers } from '../../../utils/formats';
import { isEmpty } from '../../../utils/validation';
// import InputMask from 'react-input-mask';

import '../styles.css';

const CodeConfirmation: React.FC = () => {

  const [, setTokenNotRecieved] = useState<boolean>(false);
  const [, setShowTimer] = useState<boolean>(false);
  const [, setSendingToken] = useState<boolean>(false);
  const [, setValidToken] = useState<boolean>(false);
  const [generatedToken] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [token, setToken] = useState<string>('');
  // const { data: managerData } = useSelector<Reducers, ManagerState>(
  //   state => state.managerReducer,
  // );
  // const [managerEmail, ] = useState<string>('');
  // const [managerPhone, ] = useState<string>('');

  const onTimeOut = useCallback(() => {
    setTokenNotRecieved(true);
    setSendingToken(false);
    setShowTimer(false);
  }, []);

  // const sendTokenToManager = useCallback(
  //   async (isEmail: boolean) => {
  //     const fiveDigitToken = String(Math.floor(Math.random() * 90000) + 10000);
  //     setGeneratedToken(fiveDigitToken);
  //     setSendingToken(true);
  //     setShowTimer(true);
  //     setTokenNotRecieved(false);
  //     // if (isEmail) {
  //     //   await sendToken(fiveDigitToken, undefined, managerEmail);
  //     // } else {
  //     //   await sendToken(fiveDigitToken, managerPhone, undefined);
  //     // }
  //   },
  //   [managerEmail, managerPhone],
  // );

  const compareToken = useCallback(
    (inputToken: string) => {
      setErrorMessage('');
      if (
        onlyNumbers(inputToken).length === 5 &&
        inputToken &&
        !isEmpty(generatedToken)
      ) {
        const isValid = inputToken === generatedToken;
        setValidToken(isValid);
        if (!isValid) {
          setErrorMessage('Código Inválido. Tente novamente!');
        }
      } else {
        setValidToken(false);
      }
    },
    [generatedToken],
  );

  // const invalidateToken = useCallback(() => {
  //   setErrorMessage('');
  //   setValidToken(false);
  //   setSendingToken(false);
  //   setGeneratedToken('');
  //   setTokenNotRecieved(false);
  //   setShowTimer(false);
  //   setToken('');
  //   handleConfirm();
  // }, []);

  return (
    <DialogContent>
      <Grid container alignContent="center" direction="column"></Grid>
      <Typography style={{ paddingTop: '8px', paddingBottom: '8px' }}>
        Alguns números podem ser bloqueados automaticamente pelo seu celular, e
        você não conseguirá receber o SMS. Verifique se há algum bloqueio e
        desative para receber o código.
      </Typography>
      <Typography> </Typography>
      <Typography>
        Não Recebeu ?
        <Link
          href="#"
          onClick={() => setTokenNotRecieved(false)}
          underline="hover"
        >
          {' '}
          Enviar Novamente
        </Link>
      </Typography>
      {/* <Timer minutesToDecrease={1.5} onTimeOut={onTimeOut} /> */}
    </DialogContent>
  );
};
export default CodeConfirmation;
