import schedule from './schemas/schedules.js';

export async function getSchedulesByTripId(tripId, month) {
    const query = { tripId };
    if (month) {
        query.month = month;
    }
    return schedule.find(query).lean();
}

export async function getScheduleById(id) {
    return schedule.findOne({ id: Number(id) }).lean();
}