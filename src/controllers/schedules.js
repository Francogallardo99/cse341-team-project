import { getSchedulesByTripId } from "../models/schedules.js";

export async function getSchedulesForTrip(req, res) {
    const { month } = req.query;
    if (month) {
        return getSchedulesForTripAndMonth(req, res);
    }

    const { id } = req.params;
    try {
        const schedules = await getSchedulesByTripId(id);
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getSchedulesForTripAndMonth(req, res) {
    const { id } = req.params;
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: "Month query parameter is required" });
    }

    const monthNumber = Number(month);
    if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        return res.status(400).json({ message: "Month must be a number between 1 and 12" });
    }

    try {
        const schedules = await getSchedulesByTripId(id, monthNumber);
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}