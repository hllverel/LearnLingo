import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../redux/teachers/teachersSlice.js";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { useModal } from "../../hooks/useModal.js";
import styles from "./TeachersPage.module.css";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.teachers);
  const loginRequiredModal = useModal();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ul className={styles.list}>
        {items.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            onRequireLogin={loginRequiredModal.open}
          />
        ))}
      </ul>
      {loginRequiredModal.isOpen && (
        <Modal onClose={loginRequiredModal.close}>
          <p className={styles.loginwarning}>Please log in to add teachers to your favourites.</p>
        </Modal>
      )}
    </>
  );
};

export default TeachersPage;