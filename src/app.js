import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errors.js';
import logger from './utils/logger.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import loggerRouter from './routes/logger.router.js';

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(`URL DE MONGO`);

app.use(express.json());
app.use(cookieParser());

// Middleware de logging
app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
});

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api', loggerRouter);

// Manejador de errores
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Servidor escuchando en puerto ${PORT}`);
});
