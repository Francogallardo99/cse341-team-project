import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
    },
    { _id: false }
);

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        scheduleId: {
            type: Number,
            required: true,
        },
        tripId: {
            type: String,
            required: true,
            trim: true,
        },
        ticketClass: {
            type: String,
            required: true,
            trim: true,
        },
        ticketName: {
            type: String,
            required: false,
            trim: true,
        },
        selectedDay: {
            type: String,
            required: true,
            trim: true,
        },
        passengers: {
            type: [passengerSchema],
            required: true,
            validate: {
                validator: (list) => list.length >= 1 && list.length <= 8,
                message: "A booking needs between 1 and 8 passengers.",
            },
        },
        pricePerTicket: {
            type: Number,
            required: true,
            min: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const booking = mongoose.model("Booking", bookingSchema);

export default booking;