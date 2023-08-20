import { DialogContent, Typography } from '@material-ui/core';
import { CircularProgress, FormHelperText, InputAdornment } from '@mui/material';
import CustomTextField from '../../../components/CustomTextField';
import { useNewUserContext } from '../../../context/newUserContext';
import { phoneMask, setCpfCnpjMask } from '../../../utils/masks';
import '../styles.css';
import { useCallback, useState } from 'react';
import { clearChar } from '../../../utils/formats';
import fetchJsonp from 'fetch-jsonp';
import { checkCPF } from '../../../services/serpro.services';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

const UserBasicsData = () => {

  const {
    addNewUser,
    newUser,
    addBasicErrors,
    basicErrors,
    addNewUserAddress,
    addNewUserTypeOrg,
    addNewUserDoc,
    addNewUserNameOrg,
    addIsOrganization,
    addAddressErrors,
    newUserDoc,
    addDocErrors,
    newUserDocError,
    isOrganization,

  } = useNewUserContext()

  const resetAddress = () => {

    addNewUserAddress({
      city: '',
      state: '',
      street: '',
      neighborhood: '',
      country: 'Brasil',
      number: '',
      cep: '',
    })

    addAddressErrors({
      city: '',
      state: '',
      street: '',
      neighborhood: '',
      country: '',
      number: '',
      cep: '',
    })
  }

  const [loading, setLoading] = useState(false);
  const [cpfLoading, setCpfLoading] = useState(false);
  const [docChecked, setDocChecked] = useState<boolean>(false);
  const [checkedError, setCheckedError] = useState<boolean>(false);


  const errorValidation = useCallback((event: any) => {
    let error = '';
    if (event.target.name === 'telefone') {
      if (event.target.value.length < 9 || event.target.value.length > 15) {
        error = `O campo ${event.target.name} deve ter entre 9-12 números.`
      }
    }

    else if (event.target.name === 'email') {

      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!event.target.value.match(validRegex)) {
        error = 'Por favor, digite um e-mail válido!'
      }
    }

    else if (event.target.value.length < 4) {
      error = `O campo ${event.target.name} deve ter no mínimo 4 caracteres.`
    }

    addNewUser({ ...newUser, [event.target.id]: event.target.value })
    addBasicErrors({ ...basicErrors, [event.target.id]: error });
  }, [newUser, basicErrors])


  const getCheckDoc = useCallback(async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // cpn teste : CNPJ 49427635000169
    let cleanDoc = clearChar(e.target.value)!;
    addNewUserDoc(e.target.value);
    let error = '';

    if (cleanDoc && cleanDoc.length === 14) {
      addIsOrganization(true);
      setLoading(true)
      resetAddress();

      fetchJsonp(`https://receitaws.com.br/v1/cnpj/${cleanDoc}`)
        .then((res: { json: () => any; }) => res.json())
        .then((data: any) => {
          if (data.status === 'OK') {

            addNewUser({ ...newUser, nome : data.nome })

            addNewUserAddress({
              city: data.municipio,
              state: data.uf,
              street: data.logradouro,
              neighborhood: data.bairro,
              country: 'Brasil',
              number: data.numero,
              cep: data.cep
            })

            addNewUserNameOrg(data.nome)
            addNewUserTypeOrg('publica');
            setLoading(false)
            setDocChecked(true);
            setCheckedError(false);
          }
          else {
            addDocErrors('CNPJ não encontrado');
            setCheckedError(true);
            setLoading(false);
            setDocChecked(false);
          }
        }
        ).catch((err) => {
          addDocErrors('Aguarde um momento antes de tentar novamente');
          setLoading(false)
          setDocChecked(false);
          setCheckedError(true);
        })
    }
    else if (cleanDoc && cleanDoc.length === 11) {
      setCpfLoading(true)
      resetAddress();
      addIsOrganization(false);

      checkCPF(cleanDoc).then((res) => {
        addNewUser({ ...newUser, nome : res.data.nome })
        addNewUserTypeOrg('');
        addNewUserNameOrg('');
        setDocChecked(true);
        setCheckedError(false);

      }).catch((err) => {
        addDocErrors('CPF não encontrado');
        setCheckedError(true);
        setDocChecked(false);
      }).finally(() => {
        setCpfLoading(false)
      })
    }

    else if (cleanDoc && cleanDoc.length !== 11 && cleanDoc.length !== 14) {
      error = '*Por favor, digite um valor entre 11-14 caracteres';
    }
    addDocErrors(error);
  }, [
    checkedError, 
    docChecked, 
    cpfLoading, 
    addDocErrors,
    loading,
    isOrganization,
    newUserDoc,
    newUserDocError
  ]);

  return (
    <DialogContent style={{ padding: 0 }}>
      <Typography
        variant="subtitle1"
        style={{ margin: '2rem 0 1rem', color: '#323232', fontWeight: '600' }}
      >
        Preencha os dados abaixo:
      </Typography>
      <CustomTextField
        name="documento"
        type="standard"
        label="CPF/CNPJ"
        fullWidth
        value={setCpfCnpjMask(newUserDoc)}
        onChange={getCheckDoc}
        error={!!newUserDocError}
        inputProps={{ maxLength: 18 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {loading || cpfLoading
                ? <CircularProgress style={{ width: '30px', height: '30px', margin: '10px', color: '#dfdfdf' }} />
                : docChecked && <CheckIcon style={{ color: '#449364' }} /> || checkedError && <ErrorIcon style={{ color: 'red' }} />
              }
            </InputAdornment>
          ),

        }}
      />
      <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
        {newUserDocError}
      </FormHelperText>

      <CustomTextField
        style={{ marginTop: '1rem' }}
        id="nome"
        name="nome"
        type="standard"
        label="Nome"
        fullWidth
        value={newUser?.nome}
        onChange={errorValidation}
        error={!!basicErrors.nome!}
      />
      <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
        {basicErrors.nome}
      </FormHelperText>

      <CustomTextField
        style={{ marginTop: '1rem' }}
        id="telefone"
        name="telefone"
        type="standard"
        label="Telefone"
        fullWidth
        value={phoneMask(newUser?.telefone)}
        onChange={errorValidation}
        error={!!basicErrors.telefone}
        InputLabelProps={{
          required: true,
        }}
      />
      <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
        {basicErrors.telefone}
      </FormHelperText>

      <CustomTextField
        style={{ marginTop: '1rem' }}
        id="email"
        name="email"
        type="standard"
        label="E-mail"
        fullWidth
        value={newUser?.email}
        onChange={errorValidation}
        error={!!basicErrors.email}
        InputLabelProps={{
          required: true,
        }}
      />
      <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
        {basicErrors.email}
      </FormHelperText>
    </DialogContent>
  );
};
export default UserBasicsData;
