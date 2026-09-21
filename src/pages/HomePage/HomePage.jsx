import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const stats = [
  { value: "32,000+", label: "Experienced tutors" },
  { value: "300,000+", label: "5-star tutor reviews" },
  { value: "120+", label: "Subjects taught" },
  { value: "200+", label: "Tutor nationalities" },
];

  const handleViewNowClick = () => {
    navigate('/teachers');
  };

const HomePage = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.herocontent}>
          <h1>
            Unlock your potential with the best{" "}
            <em className={styles.highlight}>language</em> tutors
          </h1>
          <p className={styles.description}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button
            type="button"
            className={styles.ctabutton}
            onClick={handleViewNowClick}
          >
            Get Started
          </button>
        </div>
          <img
            src="/assets/heroimg-yellow.png"
            alt="Smiling person with curly hair winking behind a laptop"
            className={styles.heroimg}
          />
      </section>
      <section className={styles.stats}>
        <ul className={styles.statslist}>
          {stats.map(({ value, label }) => (
            <li key={label} className={styles.statitem}>
              <span className={styles.statvalue}>{value}</span>
              <span className={styles.statlabel}>{label}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;