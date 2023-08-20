import { DialogContent, DialogTitle, FormHelperText } from '@material-ui/core';

import React, { useCallback, useState } from 'react';
import CustomTextField from '../../../components/CustomTextField';
import { onlyNumbers } from '../../../utils/formats';
import { isCpfOrCnpj, isEmpty } from '../../../utils/validation';


import '../styles.css';

const UserCellphone: React.FC = () => {

  const [cellphoneNumber, setCellphoneNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleBlur = useCallback((inputCpf: string) => {
    const documentFmt = onlyNumbers(inputCpf ?? '');
    if (isEmpty(documentFmt)) {
      setErrorMessage('');
    } else {
      if (!isCpfOrCnpj(documentFmt)) {
        setErrorMessage('Cpf Inválido');
      } else {
        setErrorMessage('');
      }
    }
  }, []);

  return (
    <DialogContent style={{ paddingTop: 0 }}>
      <DialogTitle style={{ paddingTop: 0 }}>
        E o seu número de celular?
      </DialogTitle>
      <CustomTextField
        name="cellphone"
        label="Nº Celular"
        fullWidth
        value={cellphoneNumber}
        onBlur={(event: any) => handleBlur(event.target.value)}
        onChange={(event: any) => {
          setCellphoneNumber(event.target.value);
        }}
        InputLabelProps={{
          required: true,
        }}
      />
      <FormHelperText className='errorHelperText'>
        {errorMessage}
      </FormHelperText>
    </DialogContent>
  );
};
export default UserCellphone;
