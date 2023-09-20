const NETWORK_ERROR = "Network Error";
export const SERVER_ERROR =
  "Erro ao contato o servidor. Tente novamente mais tarde.";
const EMAIL_NOT_VERIFIED =
  "E-mail não verificado. Verifique seu e-mail e tente novamente.";
const INVALID_CREDENTIALS = "Usuário ou senha inválidos.";
const EMAIL_REGISTERED = "E-mail já cadastrado.";
const USERNAME_REGISTERED = "Nome de usuário já cadastrado.";
const EMAIL_USERNAME_REGISTERED = "E-mail e nome de usuário já cadastrados.";

const isNetworkError = (error: any): boolean =>
  error.message.includes(NETWORK_ERROR);

export const getLoginResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;
  const isValidationError = error.response?.data?.non_field_errors;
  if (isValidationError) {
    const errorMessage = error.response.data.non_field_errors[0];
    if (errorMessage.includes("E-mail is not verified"))
      return EMAIL_NOT_VERIFIED;
  }
  return INVALID_CREDENTIALS;
};

export const getRegisterResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;

  const emailErrors = error.response?.data?.email;
  const usernameErrors = error.response?.data?.username;

  const emailAlreadyRegistered = emailErrors?.includes(
    "A user is already registered with this e-mail address."
  );

  const usernameAlreadyRegistered = usernameErrors?.includes(
    "A user with that username already exists."
  );

  if (emailAlreadyRegistered && usernameAlreadyRegistered)
    return EMAIL_USERNAME_REGISTERED;
  if (emailAlreadyRegistered) return EMAIL_REGISTERED;
  if (usernameAlreadyRegistered) return USERNAME_REGISTERED;

  return INVALID_CREDENTIALS;
};

export const getResetPasswordConfirmResponse = (error: any): string => {
  if (isNetworkError(error)) return SERVER_ERROR;
  else return "Senha inválida. Muito curta ou muito comum.";
};
