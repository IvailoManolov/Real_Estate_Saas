import express from 'express';

import { bookVisit, cancelBooking, createUser, getAllBookings, getAllFavorites, toFavorite } from '../controllers/userController.js';

import jwtCheck from '../config/auth0Config.js';

const router = express.Router();
//JWT
router.post("/register", jwtCheck, createUser);
router.post('/bookVisit/:id', bookVisit);
router.post('/allBookings', getAllBookings);
router.post('/cancelBooking/:id', cancelBooking);
router.post('/toFav/:rid', toFavorite);
router.post('/allFav', getAllFavorites);

export { router as userRoute };