import axios from "axios";
import { databaseURL } from "../firebase/firebase.js";

export const fetchTeachers = async () => {
  const { data } = await axios.get(`${databaseURL}/teachers.json`);
  return Object.entries(data).map(([id, teacher]) => ({ id, ...teacher }));
};