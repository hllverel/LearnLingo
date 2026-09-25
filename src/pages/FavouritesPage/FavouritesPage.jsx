import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../redux/teachers/teachersSlice.js";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import styles from "./FavouritesPage.module.css";

const FavouritesPage = () => {
  const dispatch = useDispatch();
  const { items: teachers, isLoading } = useSelector((state) => state.teachers);
  const favouriteIds = useSelector((state) => state.favourites.ids);

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchTeachers());
    }
  }, [dispatch, teachers.length]);

  const favouriteTeachers = teachers.filter((teacher) =>
    favouriteIds.includes(teacher.id)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (favouriteTeachers.length === 0) {
    return <p>You haven't added any teachers to your favourites yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {favouriteTeachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} onRequireLogin={() => {}} />
      ))}
    </ul>
  );
};

export default FavouritesPage;