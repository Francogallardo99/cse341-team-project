import { getAllTrips, getTripById } from '../controllers/trips.js';
import { getSchedulesForTrip } from '../controllers/schedules.js';
import { getAllBookings } from '../controllers/bookings.js';
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

/**
 * @swagger
 * /api/trips/{id}/schedules:
 *   get:
 *     summary: Retrieve schedules for a specific trip
 *     description: Returns a JSON array of schedules for the trip. Can be dynamically filtered by month.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The custom trip ID (e.g., alpine-panorama)
 *       - in: query
 *         name: month
 *         required: false
 *         schema:
 *           type: integer
 *         description: Optional month number to filter schedules
 *     responses:
 *       200:
 *         description: A JSON array of schedule objects
 *       400:
 *         description: Bad request (Invalid month parameter)
 *       500:
 *         description: Internal server error
 */
router.get('/trips/:id/schedules', getSchedulesForTrip);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Retrieve a list of all bookings
 *     description: Returns a JSON array of all bookings stored in the database.
 *     responses:
 *       200:
 *         description: A JSON array of booking objects
 *       500:
 *         description: Internal server error
 */
router.get('/bookings', getAllBookings);

export default router;