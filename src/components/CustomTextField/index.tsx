import { TextField as MUITextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { setCpfCnpjMask, setCpfMask } from '../../utils/masks';


export type CustomTextFieldProps = TextFieldProps & {
  type?: 'cpf' | 'cpfCnpj' | 'standard';
};

const CpfCnpjTextField: React.FC<TextFieldProps> = ({ onChange, ...rest }) => {
  return (
    <MUITextField
      {...rest}
      fullWidth
      variant="outlined"
      onChange={(event: { currentTarget: { value: any; }; target: { value: any; }; }) => {
        event.currentTarget.value = setCpfCnpjMask(event.target.value);
        if (onChange) {
          onChange(event as any);
        }
      }}
    />
  );
};

const CpfTextField: React.FC<TextFieldProps> = ({ onChange, ...rest }) => {
  return (
    <MUITextField
      {...rest}
      fullWidth
      variant="outlined"
      onChange={(event: { currentTarget: { value: any; }; target: { value: any; }; }) => {
        event.currentTarget.value = setCpfMask(event.target.value);
        if (onChange) {
          onChange(event as any);
        }
      }}
    />
  );
};

const TextField: React.FC<CustomTextFieldProps> = ({ type, ...rest }) => {
  switch (type) {
    case 'cpfCnpj':
      return <CpfCnpjTextField {...rest} />;
    case 'cpf':
      return <CpfTextField {...rest} />;
    default:
      return (
        <MUITextField {...rest} fullWidth color="primary" variant="outlined" />
      );
  }
};

export default TextField;
