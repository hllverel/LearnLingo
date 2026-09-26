import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  fetchMoreTeachers,
  fetchAllTeachers,
  loadMoreFiltered,
} from "../../redux/teachers/teachersSlice.js";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import TeacherFilters from "../../components/TeacherFilters/TeacherFilters.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { useModal } from "../../hooks/useModal.js";
import styles from "./TeachersPage.module.css";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const {
    items,
    isLoading,
    isLoadingMore,
    hasMore,
    lastKey,
    error,
    allTeachers,
    filters,
    visibleCount,
  } = useSelector((state) => state.teachers);
  const loginRequiredModal = useModal();

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchAllTeachers());
  }, [dispatch]);

  const isFiltering = Boolean(filters.language || filters.level || filters.price);

  const filteredTeachers = useMemo(() => {
    if (!isFiltering) return [];
    return allTeachers.filter((teacher) => {
      const matchesLanguage = !filters.language || teacher.languages.includes(filters.language);
      const matchesLevel = !filters.level || teacher.levels.includes(filters.level);
      const matchesPrice = !filters.price || teacher.price_per_hour === Number(filters.price);
      return matchesLanguage && matchesLevel && matchesPrice;
    });
  }, [allTeachers, filters, isFiltering]);

  const visibleTeachers = isFiltering ? filteredTeachers.slice(0, visibleCount) : items;
  const canLoadMore = isFiltering ? filteredTeachers.length > visibleCount : hasMore;

  const handleLoadMore = () => {
    if (isFiltering) {
      dispatch(loadMoreFiltered());
    } else {
      dispatch(fetchMoreTeachers(lastKey));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.layout}>
      <div className={styles.wrapper}>
        <TeacherFilters />
        <ul className={styles.list}>
          {visibleTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} onRequireLogin={loginRequiredModal.open} />
          ))}
        </ul>

        {loginRequiredModal.isOpen && (
          <Modal onClose={loginRequiredModal.close}>
            <p>Please log in to add teachers to your favourites.</p>
          </Modal>
          )}
      </div>
              {canLoadMore && (
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className={styles.loadmorebutton}
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        )}
    </section>
  );
};

export default TeachersPage;