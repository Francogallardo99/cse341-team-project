import { getAllBookingsModel, getBookingById, createBooking } from "../models/bookings.js";
import { getScheduleById } from "../models/schedules.js";
import { generateConfirmationCode } from '../includes/helpers.js';

const ticketOptions = [
    { class: 'standard', name: 'Standard Class', price: 14400, description: 'Comfortable seating for your journey.', amenities: ['Reserved seat', 'Free Wi-Fi'] },
    { class: 'premium', name: 'Premium Class', price: 21600, description: 'Extra legroom and onboard service.', amenities: ['Reserved seat', 'Free Wi-Fi', 'Complimentary drink'] },
    { class: 'first', name: 'First Class', price: 36000, description: 'The best experience on board.', amenities: ['Reserved seat', 'Free Wi-Fi', 'Meal included', 'Private lounge'] },
];

export async function getAllBookings(req, res) {
    try {
        const bookings = await getAllBookingsModel();
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const processBookingRequest = async (req, res) => {
    try {
        const { ticketClass, passengers } = req.body;

        const ticket = ticketOptions.find((option) => option.class === ticketClass);
        if (!ticket) {
            return res.status(400).json({ message: 'Invalid ticket class' });
        }

        const passengerList = Array.isArray(passengers) ? passengers : Object.values(passengers || {});

        const newBooking = await createBooking({
            ...req.body,
            bookingId: generateConfirmationCode(),
            passengers: passengerList,
            ticketName: ticket.name,
            pricePerTicket: ticket.price,
            totalAmount: ticket.price * passengerList.length,
        });

        return res.redirect(`/trips/confirmation/${newBooking.bookingId}`);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const bookingsAdminPage = async (req, res) => {
    return res.render('bookings', { title: 'Manage Bookings' });
};

export const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;
    try {
        const schedule = await getScheduleById(scheduleId);
        if (!schedule) {
            return res.status(404).render('404', { title: 'Schedule Not Found' });
        }
        return res.render('trips/book', {
            title: 'Book Your Trip',
            schedule,
            ticketOptions,
        });
    } catch (error) {
        return res.status(500).render('500', { title: 'Server Error' });
    }
};

export const confirmationPage = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await getBookingById(bookingId);
        if (!booking) {
            return res.status(404).render('404', { title: 'Booking Not Found' });
        }
        return res.render('trips/confirm', { title: 'Booking Confirmation', booking });
    } catch (error) {
        return res.status(500).render('500', { title: 'Server Error' });
    }
};