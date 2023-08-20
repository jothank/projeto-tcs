
import {
  CustomDialog,
  CustomDialogProps,
} from '../../../components/CustomDialog';
import { useCallback, useMemo, useState } from 'react';
import UserCNPJCheck from '../components/UserCPNJCheck';
import UserBasicsData from '../components/UserBasicsData';
import CustomStepperCard from '../../../components/CustomStepperCard';
import { useNewUserContext } from '../../../context/newUserContext';
import { useFeedback } from '../../../context/Feedback';
import { addNewUserAPI, addNewUserFileAPI } from '../../../services/users.services';
import { UserFileDTO } from '../../../@types/DTO/loginDTO';
import UserPasswordData from '../components/UserPasswordData';

const NewUser = (props: CustomDialogProps) => {
  const { addFeedback } = useFeedback();
  const { handleClose, ...rest } = props;

    const {
      newUser,
      basicErrors,
      addressErrors,
      newUserAdress,
      newUserDoc,
      newUserTypeOrg,
      fileErrors,
      newUserFile,
      paymentMethod,
      isOrganization,
      addNewUser,
      addNewUserAddress,
      addNewUserTypeOrg,
      addIsOrganization,
      addNewUserDoc,
      addNewUserNameOrg,
      addNewUserFile,
      addPaymentMethod,
      newUserDocError,
      newUserPassword,
      addNewUserPassword,
      passwordErrors,

    } = useNewUserContext()
  

  const cleanInputs = () => {

    addNewUser({
      nome: '',
      telefone: '',
      email: '',
    })

    addNewUserPassword({
      senha: '',
      confirmarSenha: '',
    })

    addNewUserAddress({
      street: '',
      state: '',
      country: '',
      neighborhood: '',
      city: '',
      number: '',
      cep: '',
    })
    addNewUserTypeOrg('publica')
    addIsOrganization(false)
    addNewUserDoc('')
    addNewUserNameOrg('')
    addNewUserFile({
      name: '',
      type: '',
      base64: '',
    })
    addPaymentMethod('prePago')
  }

  // const errors = `
  // basic error: basicErrors
  // Address error: addressErrors
  // fileErrors error: fileErrors
  // password error : passwordErrors
  // `
  // console.log("errors" , errors)
  // console.log("Block User", newUser)

  const [loadingFinish, setLoadingFininsh] = useState(false);

  //errors tests
  const basicsHasError = !(Object.values(basicErrors).some((item: any) => item !== "") || Object.values(newUser).some((item: any) => item === ""));
  const docHasError = !(newUserDoc === '' || newUserDocError !== '');
  const addressHasError = !(Object.values(addressErrors).some((item: any) => item !== "") || Object.values(newUserAdress).some((item: any) => item === ""));
  const fileHasError = !(newUserFile.base64 === "" || !!fileErrors);
  const passwordHasError = !(newUserPassword.senha === '' || Object.values(passwordErrors).some((item: any) => item !== ""));

  console.log("passwordHasError", newUserPassword.senha)
  const stepElements = useMemo(() => {
    if (isOrganization) {
      return [
        {
          id: 1,
          label: '',
          element: <UserBasicsData />,
          canProceed: basicsHasError && docHasError
        },
        {
          id: 2,
          label: '',
          element: <UserCNPJCheck />,
          canProceed: addressHasError
        },
       
        {
          id: 5,
          label: '',
          element: <UserPasswordData />,
          canProceed: passwordHasError,
        },
      ]
    } else {
      return [
        {
          id: 5,
          label: '',
          element: <UserBasicsData />,
          canProceed: basicsHasError && docHasError
        },
        {
          id: 6,
          label: '',
          element: <UserCNPJCheck />,
          canProceed: addressHasError
        },
        
        {
          id: 8,
          label: '',
          element: <UserPasswordData />,
          canProceed: passwordHasError,
        },
      ]
    }
  }, [
    fileHasError,
    basicsHasError,
    docHasError,
    passwordHasError,
    paymentMethod,
    addressHasError,
  ]);

  const fetchFile = (file: UserFileDTO, userData: any) => {

    addNewUserFileAPI(file).then((res) => {
      fetchUser({ ...userData, file: res.data.dados });

    }).catch((err) => {
      addFeedback({
        type: 'error',
        title: '',
        description: 'Não foi possível enviar o arquivo!',
      })
    })
  }

  const fetchUser = async (userData: any) => {
    setLoadingFininsh(true)
    addNewUserAPI(userData).then((res) => {

      addFeedback({
        type: 'success',
        title: '',
        description: 'Pronto, agora só aguardar a sua aprovação!',
      });
      handleClose();


    }).catch((err) => {
      addFeedback({
        type: 'error',
        title: '',
        description: err.response.data.message,
      })

    }).finally(() => {
      setLoadingFininsh(false)
    })
  }

  const onFinish = useCallback(async () => {
    console.log("newUserPassword.senha", newUserPassword.senha)
    const userData = {
      doc: newUserDoc,
      password: newUserPassword.senha,
      email: newUser.email,
      name: newUser.nome,
      phone: newUser.telefone,
      approved: false,
      paymentMethod: paymentMethod,
      isOrganization: isOrganization,
      street: newUserAdress.street,
      address: newUserAdress.street,
      number: newUserAdress.number,
      state: newUserAdress.state,
      city: newUserAdress.city,
      cep: newUserAdress.cep,
      type: newUserTypeOrg || '',
    }
    if (isOrganization) {
      const file = {
        base64: newUserFile.base64,
        name: newUserFile.name,
        type: newUserFile.type,
      }
      fetchFile(file, userData);
    } else {
      fetchUser(userData);
    }


  }, [
    newUser,
    newUserAdress,
    newUserDoc,
    newUserTypeOrg,
    newUserFile,
    paymentMethod,
    isOrganization,
    loadingFinish,
    newUserPassword
  ]);

  return (
    <CustomDialog
      maxWidth="sm"
      hideDefaultButtons
      handleClose={handleClose}
      {...rest}
    >
      <CustomStepperCard
        onFinishLoading={loadingFinish}
        canProceed
        onDismiss={handleClose}
        onFinish={onFinish}
        steps={stepElements}
        buttonNextLabel="Avançar"
        buttonSubmitLabel="Finalizar Cadastro"
      />
    </CustomDialog>
  );
};

export default NewUser;
