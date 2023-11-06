export interface RegisterIUser {
  id?: any | null;
  username: string;
  email: string;
  password1: string;
  password2: string;
  firstName: string;
  lastName: string;
  roles?: Array<string>;
}

export interface RegisterInputProps {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "date";
}

export interface LoginIUser {
  id?: any | null;
  username: string;
  password: string;
  roles?: Array<string>;
}

export interface PasswordResetIUser {
  email: string;
}

export interface ConfirmPasswordResetIUser {
  url: string;
  newPassword1: string;
  newPassword2: string;
}
export interface ConfirmEmailIUser {
  url: string;
  email: string | null;
}
