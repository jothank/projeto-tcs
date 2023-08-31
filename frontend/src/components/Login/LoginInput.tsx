import React from "react";
import { Field, ErrorMessage } from "formik";
import { RegisterInputProps } from "types/user.type";

const LoginInput: React.FC<RegisterInputProps> = ({ name, label, type }) => (
  <div className="form-group">
    <label htmlFor={name}> {label} </label>
    <Field name={name} type={type} className="form-control" />
    <ErrorMessage name={name} component="div" className="alert alert-danger" />
  </div>
);

export default LoginInput;
