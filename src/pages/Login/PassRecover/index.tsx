
import {
  CustomDialog,
  CustomDialogProps,
} from '../../../components/CustomDialog';
import { useCallback, useMemo, useState } from 'react';
import { useFeedback } from '../../../context/Feedback';
import { useNewPasswordContext } from '../../../context/newPasswordContext';
import CustomStepperCard from '../../../components/CustomStepperCard';
import NewPassordForm from '../components/NewPasswordForm';
import NewPasswordEmail from '../components/NewPasswordEmail';
import NewPasswordOTP from '../components/NewPasswordOTP';
import { changePasswordAPI } from '../../../services/users.services';


const PasswordRecovery = (props: CustomDialogProps) => {
  const { addFeedback } = useFeedback();
  const { handleClose, ...rest } = props;

  const {
    newPassword,
    passwordError
  } = useNewPasswordContext()


  const stepElements = useMemo(() => {
    return [
      {
        label: '',
        element: <NewPasswordEmail />,
        canProceed: newPassword.email !== '' && passwordError.email === '',
      },
      {
        label: '',
        element: <NewPasswordOTP />,
        canProceed: newPassword.otp !== '' && passwordError.otp === '',
      },
      {
        label: '',
        element: <NewPassordForm />,
        canProceed: newPassword.password !== '' && passwordError.confirmPassword === ''
          && newPassword.confirmPassword !== ''
      },
    ]
  }, [newPassword, passwordError]);

  const onFinish = useCallback(() => {

    if (newPassword.email && newPassword.otp && newPassword.password) {
      changePasswordAPI(newPassword.email, newPassword.otp, newPassword.password)
      .then(res => {
        addFeedback({
          type: 'success',
          title: '',
          description: 'Senha alterada com sucesso',
        });

      }).catch(err => {
        addFeedback({
          type: 'error',
          title: '',
          description: 'Não foi possível alterar sua senha, tente novamente!',
        })
      })
      handleClose();
    }
  }, [newPassword]);

  return (

    <CustomDialog
      maxWidth="sm"
      hideDefaultButtons
      handleClose={handleClose}
      {...rest}
    >
      <CustomStepperCard
        canProceed
        onDismiss={handleClose}
        onFinish={onFinish}
        steps={stepElements}
        buttonNextLabel="Avançar"
        buttonSubmitLabel="Finalizar"
      />
    </CustomDialog>
  );
};

export default PasswordRecovery;
