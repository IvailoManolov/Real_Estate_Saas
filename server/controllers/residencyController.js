import asyncHandler from 'express-async-handler';

import { prisma } from "../config/prismaConfig.js";

//POST CREATE A RESIDENCY
export const createResidency = asyncHandler(async (req, res) => {
    const { title,
        description,
        price,
        address,
        country,
        image,
        facilities,
        userEmail } = req.body.data;

    try {

        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                image,
                facilities,
                owner: { connect: { email: userEmail } }
            },
        });

        console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][POST] Residency creation {${title}}`);
        res.send({ message: "Residency created successfully", residency });

    } catch (err) {
        if (err.code === 'P2002') {
            throw new Error("A residency with this address already exists");
        }

        console.log('\x1b[41m%s\x1b[0m', `[FAILED][POST] Residency creation {${title}}`);
        throw new Error(err.message);
    }
});

//GET ALL RESIDENCIES
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][GET] Residencies found`);
    res.send(residencies);
});

//GET A SPECIFIC RESIDENCY
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where: { id }
        });

        console.log('\x1b[42m%s\x1b[0m', `[SUCCESS][GET] Residency found {${id}}`);
        res.send(residency);

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', `[FAILED][GET] Residency not found {${id}}`);
        throw new Error(err.message);
    }
});
