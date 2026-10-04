import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../utils/bookingSchema.js";
import styles from "./BookingForm.module.css";

const REASONS = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const BookingForm = ({ teacher, onSubmit, submitError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: { reason: REASONS[0] },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Book trial lesson</h2>
      <p className={styles.description}>
        Our experienced tutor will assess your current language level,
        discuss your learning goals, and tailor the lesson to your specific
        needs.
      </p>
      <div className={styles.teacher}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.teacheravatar}
          width="44"
          height="44"
        />
        <div className={styles.teacherinfo}>
          <p className={styles.teacherlabel}>Your teacher</p>
          <p className={styles.teachername}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>
      <p className={styles.question}>
        What is your main reason for learning {teacher.languages[0]}?
      </p>
      <div className={styles.reasons}>
        {REASONS.map((reason) => (
          <div key={reason} className={styles.reasonoption}>
            <input
              type="radio"
              id={reason}
              value={reason}
              {...register("reason")}
              className={styles.radio}
            />
            <label htmlFor={reason}>{reason}</label>
          </div>
        ))}
      </div>
      <div className={styles.fields}>
        <div className={styles.field}>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Full Name"
            className={styles.input}
          />
          {errors.fullName && (
            <p className={styles.error}>{errors.fullName.message}</p>
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
            {...register("phone")}
            type="tel"
            placeholder="Phone number"
            className={styles.input}
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>
      </div>
      {submitError && <p className={styles.error}>{submitError}</p>}
      <button type="submit" className={styles.submitbutton}>
        Book
      </button>
    </form>
  );
};

export default BookingForm;