import axios from "axios";
import { databaseURL } from "../firebase/firebase.js";

export const createBooking = (booking) =>
  axios.post(`${databaseURL}/bookings.json`, {
    ...booking,
    createdAt: new Date().toISOString(),
  });