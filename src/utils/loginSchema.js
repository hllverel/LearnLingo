import * as yup from "yup";
import { emailField, passwordField } from "./registerSchema.js";

export const loginSchema = yup.object({
  email: emailField,
  password: passwordField,
});