import axios from "axios";
import { databaseURL } from "../firebase/firebase.js";

export const PAGE_SIZE = 4;

export const fetchTeachersPage = async (startAfterKey) => {
  const limit = startAfterKey ? PAGE_SIZE + 2 : PAGE_SIZE + 1;
  const params = new URLSearchParams({
    orderBy: '"$key"',
    limitToFirst: String(limit),
  });

  if (startAfterKey) {
    params.set("startAt", `"${startAfterKey}"`);
  }

  const { data } = await axios.get(
    `${databaseURL}/teachers.json?${params.toString()}`
  );

  if (!data) {
    return { teachers: [], lastKey: startAfterKey ?? null, hasMore: false };
  }

  let entries = Object.entries(data).filter(([, value]) => value != null);

  if (startAfterKey) {
    entries = entries.filter(([id]) => id !== startAfterKey);
  }

  const hasMore = entries.length > PAGE_SIZE;
  const pageEntries = entries.slice(0, PAGE_SIZE);
  const teachers = pageEntries.map(([id, teacher]) => ({ id, ...teacher }));
  const lastKey =
    teachers.length > 0 ? teachers[teachers.length - 1].id : startAfterKey ?? null;

  return { teachers, lastKey, hasMore };
};

export const fetchTeacherById = async (id) => {
  const { data } = await axios.get(`${databaseURL}/teachers/${id}.json`);
  return data ? { id, ...data } : null;
};

export const fetchTeachersByIds = async (ids) => {
  const results = await Promise.all(ids.map(fetchTeacherById));
  return results.filter((teacher) => teacher !== null);
};

export const fetchAllTeachers = async () => {
  const { data } = await axios.get(`${databaseURL}/teachers.json`);
  if (!data) return [];
  return Object.entries(data)
    .filter(([, value]) => value != null)
    .map(([id, teacher]) => ({ id, ...teacher }));
};