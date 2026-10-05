import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTeachersByIds } from "../../services/teachers.js";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import styles from "./FavouritesPage.module.css";

const FavouritesPage = () => {
  const favouriteIds = useSelector((state) => state.favourites.ids);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (favouriteIds.length === 0) {
      setTeachers([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchTeachersByIds(favouriteIds).then((result) => {
      setTeachers(result);
      setIsLoading(false);
    });
  }, [favouriteIds]);

  if (isLoading) {
    return (
      <section className={styles.layout}>
        <p>Loading...</p>
      </section>
    );
  }

  if (teachers.length === 0) {
    return (
      <section className={styles.layout}>
        <p>You haven't added any teachers to your favourites yet.</p>
      </section>
    );
  }

  return (
    <section className={styles.layout}>
      <ul className={styles.list}>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} onRequireLogin={() => {}} />
        ))}
      </ul>
    </section>
  );
};

export default FavouritesPage;