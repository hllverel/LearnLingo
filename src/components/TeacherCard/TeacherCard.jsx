import { useState } from "react";
import styles from "./TeacherCard.module.css";

const TeacherCard = ({ teacher }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    avatar_url,
    name,
    surname,
    languages,
    lessons_done,
    rating,
    price_per_hour,
    lesson_info,
    conditions,
    levels,
    experience,
    reviews,
  } = teacher;

  return (
    <li className={styles.card}>
      <img
        src={avatar_url}
        alt={`${name} ${surname}`}
        className={styles.avatar}
      />
      <div className={styles.content}>
        <div className={styles.topRow}>
          <p className={styles.languagesLabel}>Languages</p>
          <p className={styles.meta}>Lessons online</p>
          <p className={styles.meta}>Lessons done: {lessons_done}</p>
          <p className={styles.meta}>Rating: {rating}</p>
          <p className={styles.meta}>
            Price / 1 hour: <span className={styles.price}>{price_per_hour}$</span>
          </p>
          <button type="button" className={styles.favoriteButton} aria-label="Add to favourites">
            <img src="/assets/heart.svg" alt="" width="26" height="26" />
          </button>
        </div>
        <p className={styles.name}>
          {name} {surname}
        </p>
        <p className={styles.detail}>
          <span className={styles.detailLabel}>Speaks:</span>{" "}
          {languages.join(", ")}
        </p>
        <p className={styles.detail}>
          <span className={styles.detailLabel}>Lesson Info:</span> {lesson_info}
        </p>
        <p className={styles.detail}>
          <span className={styles.detailLabel}>Conditions:</span>{" "}
          {conditions.join(" ")}
        </p>
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className={styles.readMore}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
        {isExpanded && (
          <div className={styles.expanded}>
            <p className={styles.experience}>{experience}</p>
            {reviews.map((review) => (
              <div key={review.reviewer_name} className={styles.review}>
                <p className={styles.reviewerName}>{review.reviewer_name}</p>
                <p className={styles.reviewerRating}>⭐ {review.reviewer_rating}</p>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        <ul className={styles.levels}>
          {levels.map((level) => (
            <li key={level} className={styles.levelTag}>
              #{level}
            </li>
          ))}
        </ul>
        {isExpanded && (
          <button type="button" className={styles.bookButton}>
            Book trial lesson
          </button>
        )}
      </div>
    </li>
  );
};

export default TeacherCard;