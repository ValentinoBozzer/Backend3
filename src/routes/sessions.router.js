import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Usuario registrado
 */
router.post('/register',sessionsController.register);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Inicia sesión
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Sesión iniciada
 */
router.post('/login',sessionsController.login);

/**
 * @swagger
 * /api/sessions/logout:
 *   post:
 *     summary: Cierra la sesión y actualiza last_connection
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Sesión cerrada y last_connection actualizado
 *       400:
 *         description: No hay sesión activa
 */
router.post('/logout', sessionsController.logout);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtiene el usuario actual autenticado
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Usuario autenticado
 */
router.get('/current',sessionsController.current);

/**
 * @swagger
 * /api/sessions/unprotectedLogin:
 *   get:
 *     summary: Login sin protección (solo para pruebas)
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Login sin protección exitoso
 */
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);

/**
 * @swagger
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Usuario actual sin protección (solo para pruebas)
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Usuario autenticado sin protección
 */
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;