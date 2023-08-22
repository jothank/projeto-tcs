
// import React, { useCallback, useRef, useState } from 'react';
// import '../styles.css';
// import {
//   DialogContent,
//   Typography,
//   Grid,
//   FormHelperText,
//   FormControl,
// } from '@material-ui/core';

// import CheckIcon from '@mui/icons-material/Check';
// import { useStyles } from '../NewUser/styles';
// import CustomTextField from '../../../components/CustomTextField';
// import { useNewUserContext } from '../../../context/newUserContext';
// import { removeNonDigits, zipCodeMask } from '../../../utils/masks';
// import { addressByCEP } from '../../../services/util.services';
// import { CircularProgress, InputAdornment } from '@mui/material';

// const UserCNPJCheck: React.FC = () => {

//   const classes = useStyles();
//   const {
//     addNewUserAddress,
//     newUserAdress,
//     addAddressErrors,
//     addressErrors,
//     newUserNameOrg,
//     isOrganization,
//   } = useNewUserContext()


//   const [loadingCEP, setLoadingCEP] = useState(false);
//   const [checkCEP, setCheckCEP] = useState<boolean | null>(null);

//   console.log("checkCEP" , checkCEP)

//   const errorValidation = (event: any) => {

//     let error = '';

//     if (event.target.value.length < 2 || event.target.value.length > 20) {
//       error = `O ${event.target.name} deve ter entre 3-20 caracteres.`
//     }
//     addNewUserAddress({ ...newUserAdress, number: event.target.value })
//     addAddressErrors({ ...addressErrors, [event.target.name]: error });
//   }

//   const resetNewUserAddress = (CEP?: string) => {
//     addNewUserAddress({
//       city: "",
//       state: "",
//       street: '',
//       neighborhood: "",
//       country: 'Brasil',
//       number: '',
//       cep: CEP || '',
//     });
//   }

//   const numberRef: any = useRef();

//   const getAddressByCEP = useCallback(async (event: any, CEP: string) => {
//     let error = '';
//     addNewUserAddress({ ...newUserAdress, cep: CEP })

//     if (CEP && CEP.length === 8) {
//       setLoadingCEP(true)
//       try {
        
//         const res = await addressByCEP(CEP);
//         if (res.data.erro) {
//           console.log("teste error")
//           error = "*CEP não encontrado";
//           resetNewUserAddress(CEP);
//           setCheckCEP(false);
//         } else {

//           numberRef.current.focus()
//           error = '';
//           const {
//             logradouro,
//             bairro,
//             localidade,
//             uf,
//           } = res.data;

//           addNewUserAddress({
//             city: localidade,
//             state: uf,
//             street: logradouro,
//             neighborhood: bairro,
//             country: 'Brasil',
//             number: newUserAdress.number,
//             cep: CEP
//           })
//           setCheckCEP(true);
//           addAddressErrors({ ...addressErrors, CEP: '' });
//         }
//       } catch (err) {
//         setCheckCEP(false)
//         error = "*CEP não encontrado";
//       } finally {
//         setLoadingCEP(false)
//       }
//     } else {
//       error = "*O CEP deve ter 8 números";
//       setCheckCEP(false)
//     }
//     event.target.nextElementSibling.focus()

//     addAddressErrors({ ...addressErrors, CEP: error });
//   }, [newUserAdress, loadingCEP, addressErrors, checkCEP])


//   return (
//     <DialogContent className={classes.dialogContentContainer}>
//       <Typography
//         variant="subtitle1"
//         className={classes.subTitleStepper}
//       >
//         Preencha seu endereço:
//       </Typography>

//       <Grid container className={classes.docContainer}>
//         {isOrganization &&
//           <Grid item md={12} xs={12} style={{ marginTop: '1rem' }}>
//             <CustomTextField
//               disabled={isOrganization || !newUserAdress}
//               name="empresa"
//               type="standard"
//               label="Empresa"
//               fullWidth
//               value={newUserNameOrg}
//               onChange={errorValidation}
//             />

//           </Grid>
//         }
//         <Grid item md={12} xs={12} style={{ padding: '0', marginTop: '1rem' }}>
//           <CustomTextField
//             disabled={isOrganization}
//             name="CEP"
//             type="standard"
//             label="CEP"
//             fullWidth
//             value={zipCodeMask(newUserAdress.cep)}
//             onChange={(event) => getAddressByCEP(event, removeNonDigits(event.target.value))}
//             error={!!addressErrors.CEP}
//             inputProps={{ maxLength: 9 }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position='end'>
//                   {loadingCEP
//                     ? <CircularProgress style={{ width: '30px', height: '30px', margin: '10px', color: '#dfdfdf' }} />
//                     : checkCEP && <CheckIcon style={{ color: '#449364' }} />
//                   }
//                 </InputAdornment>
//               ),
    
//             }}
//           />
//           <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
//             {addressErrors.CEP}
//           </FormHelperText>
//         </Grid>

//         <Grid item md={12} xs={12} style={{ padding: '0', marginTop: '1rem' }}>
//           <CustomTextField
//             disabled
//             name="País"
//             type="standard"
//             label="País"
//             fullWidth
//             value={newUserAdress.country}
//             onChange={(e) => addNewUserAddress({ ...newUserAdress, country: e.target.value })}
//           />
//         </Grid>

//         <Grid item md={12} xs={12} style={{ padding: '0', marginTop: '1rem' }}>
//           <CustomTextField
//             disabled
//             name="estado"
//             type="standard"
//             label="Estado"
//             fullWidth
//             value={newUserAdress.state}
//             onChange={(e) => addNewUserAddress({ ...newUserAdress, state: e.target.value })}
//             InputLabelProps={{
//               required: true,
//             }}
//           />
//         </Grid>

//         <Grid item md={12} xs={12} style={{ padding: '0', marginTop: '1rem' }}>
//           <CustomTextField
//             disabled
//             name="cidade"
//             type="standard"
//             label="Cidade"
//             fullWidth
//             value={newUserAdress.city}
//             onChange={(e) => addNewUserAddress({ ...newUserAdress, city: e.target.value })}
//           />
//         </Grid>

//         <Grid item md={9} sm={9} xs={12} className={classes.docLogradouro}>
//           <CustomTextField
//             disabled
//             name="rua"
//             type="standard"
//             label="Logradouro"
//             fullWidth
//             value={newUserAdress.street}
//             onChange={(e) => addNewUserAddress({ ...newUserAdress, street: e.target.value })}
//           />
//         </Grid>

//         <Grid item md={3} sm={3} xs={12} style={{ padding: '0', marginTop: '1rem' }}>
//           <CustomTextField
//             disabled={isOrganization}
//             name="número"
//             type="standard"
//             label="Número"
//             inputRef={numberRef}
//             fullWidth
//             value={newUserAdress.number}
//             onChange={errorValidation}
//             error={!!addressErrors['número']}
//           />
//           <FormHelperText style={{ color: 'red', fontSize: '14px' }}>
//             {addressErrors['número']}
//           </FormHelperText>
//         </Grid>

//         <Grid item md={12} xs={12} style={{ padding: '0', marginTop: '1rem' }}>
//           <CustomTextField
//             disabled
//             name="bairro"
//             type="standard"
//             label="Bairro"
//             fullWidth
//             value={newUserAdress.neighborhood}
//             onChange={(e) => addNewUserAddress({ ...newUserAdress, neighborhood: e.target.value })}
//           />

//         </Grid>


//         {isOrganization &&
//           <Grid item md={12} xs={12} style={{ padding: '0', marginTop: '1rem' }}>
//             <FormControl
//               fullWidth
//               variant="outlined"
//               style={{ marginTop: '1rem' }}
//             >
             
//             </FormControl>
//           </Grid>
//         }
//       </Grid>

//     </DialogContent>
//   );
// };
// export default UserCNPJCheck;


