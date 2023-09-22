import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoutes.js';
import { residencyRoute } from './routes/residencyRoute.js';

dotenv.config();

const application = express();

const PORT = process.env.PORT;

application.use(express.json());
application.use(cookieParser());
application.use(cors());

application.use('/api/user', userRoute);
application.use('/api/residency', residencyRoute);

application.listen(PORT, () => {
    console.log('\x1b[42m%s\x1b[0m', `[SUCCESS] Server running on port ${PORT}`);
});

