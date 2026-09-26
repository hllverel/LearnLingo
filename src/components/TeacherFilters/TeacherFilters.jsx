import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/teachers/teachersSlice.js";
import { getUniqueLanguages, getUniqueLevels, getUniquePrices } from "../../utils/filterOptions.js";
import styles from "./TeacherFilters.module.css";

const TeacherFilters = () => {
  const dispatch = useDispatch();
  const allTeachers = useSelector((state) => state.teachers.allTeachers);
  const filters = useSelector((state) => state.teachers.filters);

  const languages = getUniqueLanguages(allTeachers);
  const levels = getUniqueLevels(allTeachers);
  const prices = getUniquePrices(allTeachers);

  const handleChange = (field) => (event) => {
    dispatch(setFilter({ field, value: event.target.value }));
  };

  return (
    <div className={styles.filtersbar}>
      <label className={styles.filter}>
        <div className={styles.label}>Languages</div>
        <select value={filters.language} onChange={handleChange("language")} className={styles.select}>
          <option value="">All</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.filter}>
        <div className={styles.label}>Level of knowledge</div>
        <select value={filters.level} onChange={handleChange("level")} className={styles.select}>
          <option value="">All</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.filter}>
        <div className={styles.label}>Price</div>
        <select value={filters.price} onChange={handleChange("price")} className={styles.select}>
          <option value="">All</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              {price} $
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default TeacherFilters;