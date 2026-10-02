import * as yup from "yup";
import { emailField } from "./registerSchema.js";

export const bookingSchema = yup.object({
  reason: yup.string().required("Please select a reason"),
  fullName: yup.string().trim().required("Full name is required"),
  email: emailField,
  phone: yup.string().trim().required("Phone number is required"),
});