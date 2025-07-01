import { Router} from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtiene todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get('/',adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtiene una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *       404:
 *         description: Adopción no encontrada
 */
router.get('/:aid',adoptionsController.getAdoption);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crea una adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Adopción creada
 *       404:
 *         description: Usuario o mascota no encontrados
 */
router.post('/:uid/:pid',adoptionsController.createAdoption);

export default router;