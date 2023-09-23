import asyncHandler from 'express-async-handler';

import { prisma } from "../config/prismaConfig.js";


//POST CREATE A USER
export const createUser = asyncHandler(async (req, res) => {
    let { email } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email: email } });

    if (!userExists) {
        const user = await prisma.user.create({ data: req.body });

        console.log('\x1b[42m%s\x1b[0m', `[SUCCESS] User registered ${email}`);

        res.send({
            message: 'User registered successfully',
            user: user
        });
    }
    else {
        console.log('\x1b[41m%s\x1b[0m', `[FAILED] User already registered {EMAIL : ${email}}`);
        res.sendStatus(201);
    }
});

//POST BOOK A VISIT
export const bookVisit = asyncHandler(async (req, res) => {

    const { email, date } = req.body;
    const { id } = req.params;

    try {

        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisit: true },
        });

        if (alreadyBooked.bookedVisit.some((visit) => visit.id === id)) {
            console.log('\x1b[33m%s\x1b[0m', `[WARNING][POST] Residency already booked {${id}}`);
            res.status(400).json({ message: "This residency is already booked by you!" });
        }
        else {
            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisit: { push: { id, date } },
                }
            });
            console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][POST] Residency booked {${id}}`);
            res.send("Your visit is booked successfully!");
        }

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', `[FAILED][POST] Residency not booked {${id}}`);
        throw new Error(err.message);
    }
});

//GET ALL BOOKINGS OF A USER
export const getAllBookings = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const bookings = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisit: true }
        });

        console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][GET] Getting all bookings for {${email}}`);
        res.status(200).send(bookings);

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', `[FAILED][GET] Getting all bookings for {${email}}`);
        throw new Error(err.message);
    }

});

//POST CANCEL A BOOKING
export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    try {

        //Extract the user with the email.
        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisit: true }
        });

        //Find the index of the property that is booked.
        const bookedIndex = user.bookedVisit.findIndex((visit) => visit.id === id);

        if (bookedIndex === -1) {
            res.status(400).json({ message: "Booking not found!" });
        } else {

            //Remove the booked property from the JSON array.
            user.bookedVisit.splice(bookedIndex, 1);

            //Update the DB.
            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisit: user.bookedVisit
                }
            });

            console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][POST] Cancel booking for {${id}}`);

            res.send("Booking cancelled successfully");
        }

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', `[FAILED][POST] Cancel booking for {${id}}`);
        throw new Error(err.message);
    }
});

//POST ADD/REMOVE A RESIDENCY FAVORITE
export const toFavorite = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;

    try {

        const user = await prisma.user.findUnique({
            where: { email }
        });

        // If user already like the residency, remove it.
        if (user.favResidenciesId.includes(rid)) {

            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesId: {
                        set: user.favResidenciesId.filter((id) => id !== rid)
                    }
                }
            });

            console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][POST] Residency favorite removed {${rid}}`);
            res.send({ message: "Removed from favorites", user: updatedUser });
        } else {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesId: {
                        push: rid
                    }
                }
            });
            console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][POST] Residency favorite added {${rid}}`);
            res.send({ message: "Updated favorite", user: updateUser });
        }

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', `[FAILED][POST] Residency favorite {${rid}}`);
        throw new Error(err.message);
    }
});

//GET ALL FAVORITES.
export const getAllFavorites = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {

        const favResd = await prisma.user.findUnique({
            where: { email },
            select: { favResidenciesId: true }
        });

        console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][GET] All Favorites for {${email}}`);
        res.status(200).send(favResd);

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', `[FAILED][GET] All Favorites for {${email}}`);
        throw new Error(err.message);
    }
});