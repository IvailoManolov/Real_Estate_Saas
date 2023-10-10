import express from 'express';

import { bookVisit, cancelBooking, createUser, getAllBookings, getAllFavorites, toFavorite } from '../controllers/userController.js';

import jwtCheck from '../config/auth0Config.js';

const router = express.Router();
//JWT
router.post("/register", jwtCheck, createUser);
router.post('/bookVisit/:id', jwtCheck, bookVisit);
router.post('/allBookings', jwtCheck, getAllBookings);
router.post('/cancelBooking/:id', jwtCheck, cancelBooking);
router.post('/toFav/:rid', jwtCheck, toFavorite);
router.post('/allFav', jwtCheck, getAllFavorites);

export { router as userRoute };