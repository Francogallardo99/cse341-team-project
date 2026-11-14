import { getAllTrips, getTripById } from '../controllers/trips.js';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Retrieve a list of all trips
 *     description: Returns a JSON array of all available scenic trips.
 *     responses:
 *       200:
 *         description: A JSON array of trip objects
 *       500:
 *         description: Internal server error
 */
router.get('/trips', getAllTrips);

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Retrieve a single trip by ID
 *     description: Returns a single trip object based on its custom string ID (e.g., alpine-panorama).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom trip ID
 *     responses:
 *       200:
 *         description: A JSON object of the requested trip
 *       404:
 *         description: Trip not found
 *       500:
 *         description: Internal server error
 */
router.get('/trips/:id', getTripById);

export default router;