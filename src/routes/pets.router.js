import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtiene todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */
router.get('/',petsController.getAllPets);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crea una nueva mascota
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Mascota creada
 */
router.post('/',petsController.createPet);

/**
 * @swagger
 * /api/pets/withimage:
 *   post:
 *     summary: Crea una nueva mascota con imagen
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Mascota creada con imagen
 */
router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);

/**
 * @swagger
 * /api/pets/{pid}:
 *   put:
 *     summary: Actualiza una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Mascota actualizada
 *       404:
 *         description: Mascota no encontrada
 */
router.put('/:pid',petsController.updatePet);

/**
 * @swagger
 * /api/pets/{pid}:
 *   delete:
 *     summary: Elimina una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota eliminada
 *       404:
 *         description: Mascota no encontrada
 */
router.delete('/:pid',petsController.deletePet);

export default router;