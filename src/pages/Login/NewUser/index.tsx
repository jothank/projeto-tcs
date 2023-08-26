import { CustomDialog, CustomDialogProps } from '../../../components/CustomDialog';
import { useCallback, useMemo, useState } from 'react';
import UserBasicsData from '../components/UserBasicsData';
import CustomStepperCard from '../../../components/CustomStepperCard';
import { useNewUserContext } from '../../../context/newUserContext';
import { useFeedback } from '../../../context/Feedback';
import { addNewUserAPI } from '../../../services/users.services';
import UserPasswordData from '../components/UserPasswordData';

const NewUser = (props: CustomDialogProps) => {
  const { addFeedback } = useFeedback();
  const { handleClose, ...rest } = props;

  const {
    newUser,
    basicErrors,
    addressErrors,
    newUserAdress,
    isOrganization,
    addNewUser,
    addNewUserAddress,
    addNewUserTypeOrg,
    addIsOrganization,
    newUserPassword,
    addNewUserPassword,
    passwordErrors,
    newUserDoc,
  } = useNewUserContext();

  const cleanInputs = () => {
    addNewUser({
      nome: '',
      telefone: '',
      email: '',
    });

    addNewUserPassword({
      senha: '',
      confirmarSenha: '',
    });

    addNewUserAddress({
      street: '',
      state: '',
      country: '',
      neighborhood: '',
      city: '',
      number: '',
      cep: '',
    });
    addNewUserTypeOrg('publica');
    addIsOrganization(false);
  };

  const [loadingFinish, setLoadingFininsh] = useState(false);

  //errors tests
  const basicsHasError = !(
    Object.values(basicErrors).some((item: any) => item !== '') ||
    Object.values(newUser).some((item: any) => item === '')
  );
  const addressHasError = !(
    Object.values(addressErrors).some((item: any) => item !== '') ||
    Object.values(newUserAdress).some((item: any) => item === '')
  );
  const passwordHasError = !(
    newUserPassword.password === '' ||
    Object.values(passwordErrors).some((item: any) => item !== '')
  );

  const stepElements = useMemo(() => {
    if (isOrganization) {
      return [
        {
          id: 1,
          label: '',
          element: <UserBasicsData />,
          canProceed: basicsHasError,
        },
        // {
        //   id: 2,
        //   label: '',
        //   element: <UserCNPJCheck />,
        //   canProceed: addressHasError
        // },

        {
          id: 5,
          label: '',
          element: <UserPasswordData />,
          canProceed: passwordHasError,
        },
      ];
    } else {
      return [
        {
          id: 5,
          label: '',
          element: <UserBasicsData />,
          canProceed: basicsHasError,
        },
        // {
        //   id: 6,
        //   label: '',
        //   element: <UserCNPJCheck />,
        //   canProceed: addressHasError
        // },

        {
          id: 8,
          label: '',
          element: <UserPasswordData />,
          canProceed: passwordHasError,
        },
      ];
    }
  }, [basicsHasError, passwordHasError, addressHasError]);

  const fetchUser = async (userData: any) => {
    setLoadingFininsh(true);
    addNewUserAPI(userData)
      .then((res) => {
        addFeedback({
          type: 'success',
          title: '',
          description: 'Usuário cadastrado com sucesso',
        });
        handleClose();
      })
      .catch((err) => {
        addFeedback({
          type: 'error',
          title: '',
          description: err.response.data.message,
        });
      })
      .finally(() => {
        setLoadingFininsh(false);
      });
  };

  const onFinish = useCallback(async () => {
    console.log('newUserPassword.senha', newUserPassword.senha);
    const userData = {
      cpf: newUserDoc,
      password1: newUserPassword.senha,
      password2: newUserPassword.senha,
      email: newUser.email,
      name: newUser.nome,
      phone: newUser.telefone,
      username: newUserDoc,
    };
    console.log('finalizar', newUser.newUserDoc);
    try {
      const doc = await addNewUserAPI(userData);
      addFeedback({
        type: 'success',
        title: '',
        description: 'Usuário aprovado com sucesso',
      });
    } catch (error) {
      addFeedback({
        type: 'error',
        title: '',
        description: 'Não foi possível cadastar um novo usuário',
      });
    }
  }, [newUser, newUserAdress, loadingFinish, newUserPassword]);

  return (
    <CustomDialog maxWidth="sm" hideDefaultButtons handleClose={handleClose} {...rest}>
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
