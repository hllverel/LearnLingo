import axios from "axios";
import { databaseURL } from "../firebase/firebase.js";

export const fetchFavouriteIds = async (uid) => {
  const { data } = await axios.get(`${databaseURL}/users/${uid}/favourites.json`);
  return data ? Object.keys(data) : [];
};

export const addFavouriteId = (uid, teacherId) =>
  axios.put(`${databaseURL}/users/${uid}/favourites/${teacherId}.json`, true);

export const removeFavouriteId = (uid, teacherId) =>
  axios.delete(`${databaseURL}/users/${uid}/favourites/${teacherId}.json`);