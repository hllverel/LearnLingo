import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../../redux/favourites/favouritesSlice.js";
import styles from "./TeacherCard.module.css";

const TeacherCard = ({ teacher, onRequireLogin }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const favouriteIds = useSelector((state) => state.favourites.ids);
  const isFavourite = favouriteIds.includes(teacher.id);

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


  const handleFavouriteClick = () => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    dispatch(
      toggleFavourite({ uid: user.uid, teacherId: teacher.id, isFavourite })
    );
  };

  return (
    <li className={styles.card}>
      <div className={styles.profilepic}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={styles.avatar}
        />
        <svg>
          <use href="/symbol-defs.svg#online" />
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.toprow}>
          <p className={styles.languagesLabel}>Languages</p>
          <div className={styles.toprowright}>
            <div className={styles.toprowdetails}>
              <div className={styles.lessons}>
                <svg>
                  <use href="/symbol-defs.svg#book" />
                </svg>
                <p className={styles.meta}>Lessons online</p>
              </div>
              <span>|</span>
              <p className={styles.meta}>Lessons done: {lessons_done}</p>
              <span>|</span>
              <p className={styles.meta}>Rating: {rating}</p>
              <span>|</span>
              <p className={styles.meta}>
                Price / 1 hour: <span className={styles.price}>{price_per_hour}$</span>
              </p>
            </div>
            <button type="button" className={isFavourite ? `${styles.favouritebutton} ${styles.active}` : styles.favouritebutton} onClick={handleFavouriteClick} >
              <svg>
                <use href="/symbol-defs.svg#favourite" />
              </svg>
            </button>
          </div>
        </div>
        <p className={styles.name}>{name} {surname}</p>
        <div className={styles.details}>
          <p className={styles.detail}>
            <span className={styles.detaillabel}>Speaks:</span>{" "}
            <span className={styles.languagedetail}>{languages.join(", ")}</span>
          </p>
          <p className={styles.detail}>
            <span className={styles.detaillabel}>Lesson Info:</span> {lesson_info}
          </p>
          <p className={styles.detail}>
            <span className={styles.detaillabel}>Conditions:</span>{" "}
            {conditions.join(" ")}
          </p>
        </div>
        <button className={styles.readmore}
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
        {isExpanded && (
          <div className={styles.expanded}>
            <p className={styles.experience}>{experience}</p>
            {reviews.map((review) => (
              <div key={review.reviewer_name} className={styles.review}>
                <p className={styles.reviewername}>{review.reviewer_name}</p>
                <div className={styles.reviewerrating}>
                  <svg><use href="/symbol-defs.svg#star" /></svg>
                  <p>{review.reviewer_rating}</p>
                </div>
                <p className={styles.reviewcomment}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        <ul className={styles.levels}>
          {levels.map((level) => (
            <li key={level} className={styles.leveltag}>
              #{level}
            </li>
          ))}
        </ul>
        {isExpanded && (
          <button type="button" className={styles.booktrialbutton}>
            Book trial lesson
          </button>
        )}
      </div>
    </li>
  );
};

export default TeacherCard;