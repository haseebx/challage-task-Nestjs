import * as yup from "yup";

export const signInValidation = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^(?:\+?\d{1,3})?\d{10,14}$|^[\w._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please enter a valid Email"
    ),
  password: yup.string().required("Password is Required"),
});
      