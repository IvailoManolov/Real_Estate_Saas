import asyncHandler from 'express-async-handler';

import { prisma } from "../config/prismaConfig.js";

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

        console.log('\x1b[42m%s\x1b[0m', `[SUCCESS] Residency creation {${title}}`);
        res.send({ message: "Residency created successfully", residency });

    } catch (err) {
        if (err.code === 'P2002') {
            throw new Error("A residency with this address already exists");
        }

        console.log('\x1b[41m%s\x1b[0m', `[FAILED] Residency creation {${title}}`);
        throw new Error(err.message);
    }
});