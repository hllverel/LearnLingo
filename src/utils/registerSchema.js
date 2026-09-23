import * as yup from "yup";

export const emailField = yup
  .string()
  .trim()
  .email("Enter a valid email")
  .required("Email is required");

export const passwordField = yup
  .string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required");

export const registerSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: emailField,
  password: passwordField,
});