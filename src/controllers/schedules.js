import { getSchedulesByTripId } from "../models/schedules.js";

export async function getSchedulesForTrip(req, res) {
    const { month } = req.query;
    if (month) {
        return getSchedulesForTripAndMonth(req, res);
    }
    const { id } = req.params;
    try {
        const schedules = await getSchedulesByTripId(id);
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getSchedulesForTripAndMonth(req, res) {
    const { id } = req.params;
    const { month } = req.query;
    if (!month) {
        return res.status(400).json({ message: "Month query parameter is required" });
    }
    try {
        const schedules = await getSchedulesByTripId( id, month);
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
