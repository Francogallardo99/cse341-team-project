import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        tripId: {
            type: String,
            required: true,
            trim: true,
        },
        departureTime: {
            type: String,
            required: true,
            trim: true,
        },
        arrivalTime: {
            type: String,
            required: true,
            trim: true,
        },
        daysOfWeek: {
            type: [String],
            required: false,
        },
        status: {
            type: Boolean,
            required: true,
        },
        month: {
            type: Number,
            required: false,
        },
    }
);

const schedule = mongoose.model("Schedule", scheduleSchema);
export default schedule;