import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/registerSchema.js";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onSubmit, submitError  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <div className={styles.formpopup}>
        <div className={styles.formheader}>
            <h2>Registration</h2>
            <p className={styles.formdescription}>
              Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information
            </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
            <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className={styles.input}
            />
            {errors.name && (
            <p className={styles.error}>{errors.name.message}</p>
            )}
        </div>
        <div className={styles.field}>
            <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={styles.input}
            />
            {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
            )}
        </div>
        <div className={styles.field}>
            <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={styles.input}
            />
            {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
            )}
        </div>
        
        {submitError && <p className={styles.error}>{submitError}</p>}

        <button type="submit" className={styles.submitbutton}>
            Sign Up
        </button>
        </form>
    </div>
  );
};

export default RegisterForm;