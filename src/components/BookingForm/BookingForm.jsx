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
          className={styles.teacherAvatar}
          width="44"
          height="44"
        />
        <div>
          <p className={styles.teacherLabel}>Your teacher</p>
          <p className={styles.teacherName}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>
      <p className={styles.question}>
        What is your main reason for learning {teacher.languages[0]}?
      </p>
      <div className={styles.reasons}>
        {REASONS.map((reason) => (
          <label key={reason} className={styles.reasonOption}>
            <input
              type="radio"
              value={reason}
              {...register("reason")}
              className={styles.radio}
            />
            {reason}
          </label>
        ))}
      </div>
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
      {submitError && <p className={styles.error}>{submitError}</p>}
      <button type="submit" className={styles.submitButton}>
        Book
      </button>
    </form>
  );
};

export default BookingForm;