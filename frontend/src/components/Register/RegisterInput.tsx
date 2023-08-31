import { RegisterInputProps } from "types/user.type";
import { Field, ErrorMessage } from "formik";

export const RegisterInput: React.FC<RegisterInputProps> = ({
  name,
  label,
  type,
}) => (
  <div className="form-group">
    <label htmlFor={name}> {label} </label>
    <Field name={name} type={type} className="form-control" />
    <ErrorMessage name={name} component="div" className="alert alert-danger" />
  </div>
);
