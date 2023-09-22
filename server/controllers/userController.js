import asyncHandler from 'express-async-handler';

import { prisma } from "../config/prismaConfig.js";

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