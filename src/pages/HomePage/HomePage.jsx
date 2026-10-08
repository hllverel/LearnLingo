import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./HomePage.module.css";

const stats = [
  { value: "32,000+", label: "Experienced tutors" },
  { value: "300,000+", label: "5-star tutor reviews" },
  { value: "120+", label: "Subjects taught" },
  { value: "200+", label: "Tutor nationalities" },
];

const HomePage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { openLoginModal } = useOutletContext();

  return (
    <div className={styles.layout}>
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
          {isLoggedIn ? (
            <Link to="/teachers" className={styles.ctabutton}>Get Started</Link>
            ) : (
            <button
            type="button"
            className={styles.ctabutton}
            onClick={openLoginModal}
            >
            Get Started
            </button>
          )}
        </div>
        <div className={styles.heroimgwrapper}>
        </div>
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