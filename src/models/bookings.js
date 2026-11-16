import booking from './schemas/bookings.js';

export async function getBookingById(bookingId) {
    return booking.findOne({ bookingId }).lean();
}

export async function createBooking(bookingData) {
    const newBooking = new booking(bookingData);
    return newBooking.save();
}

export async function getAllBookingsModel() {
    return booking.find().lean();
}