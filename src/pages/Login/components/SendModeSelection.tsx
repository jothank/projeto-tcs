import {
  Box,
  Checkbox,
  DialogContent,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Link,
  Typography,
} from '@material-ui/core';
import { ReactComponent as WarningIcon } from '../../../assets/icons/warning.svg';


import React, { useCallback, useState } from 'react';
import '../styles.css';
import { CustomDialog } from '../../../components/CustomDialog';

const SendModeSelection: React.FC = () => {
  const [openAtentionDialog, setOpenAtentionDialog] = useState(false);
  const [userData] = useState({
    phone: '(00) 0 0000-0000',
    email: 'teste@teste.com.br',
  });
  const [sendByPhone, setSendByPhone] = useState(true);
  const [sendByEmail, setSendByEmail] = useState(false);

  const handleSendMethod = useCallback(() => {
    setSendByPhone(prev => !prev);
    setSendByEmail(prev => !prev);
  }, []);

  const { email, phone } = userData;

  return (
    <DialogContent>
      <Box sx={{ marginBottom: '1em' }}>
        <Typography variant="h6">Onde Receber o código de acesso?</Typography>
        <Typography variant="subtitle1">
          Para sua segurança, iremos enviar um token de confirmação para validar
          sua solicitação. Por onde você deseja receber? Selecione abaixo e
          clique em avançar
        </Typography>
      </Box>
      <FormGroup aria-label="position">
        <FormLabel style={{ fontWeight: 'bold' }}>Nº Celular</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sendByPhone}
              value={phone}
              name="sendByPhone"
              onChange={(_event: any) => handleSendMethod()}
            />
          }
          labelPlacement="end"
          label={phone}
        />
        <FormLabel style={{ fontWeight: 'bold' }}>E-mail</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sendByEmail}
              name="sendByEmail"
              value={email}
              onChange={_event => handleSendMethod()}
            />
          }
          labelPlacement="end"
          label={email}
        />
      </FormGroup>
      <Typography variant="subtitle1" color="textSecondary">
        <Link
          href="#"
          underline="hover"
          onClick={() => setOpenAtentionDialog(true)}
        >
          Não reconheço esses dados
        </Link>
      </Typography>
      <CustomDialog
        showCloseButton
        hideDefaultButtons
        maxWidth="xs"
        open={openAtentionDialog}
        handleClose={() => setOpenAtentionDialog(false)}
      >
        <Box className='warningMessageContainer'>
          <WarningIcon />
          <Typography variant="body1">
            Para a troca de dados pessoais, por favor, entre em contato com o
            seu consultor de atendimento.
          </Typography>
        </Box>
      </CustomDialog>
    </DialogContent>
  );
};
export default SendModeSelection;
