import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/loginSchema.js";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onSubmit, submitError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <div className={styles.formpopup}>
        <div className={styles.formheader}>
            <h2>Log In</h2>
            <p className={styles.formdescription}>
              Welcome back! Please enter your credentials to access your account and continue your search for an teacher.
            </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
            Log In
        </button>
        </form>
    </div>
  );
};

export default LoginForm;