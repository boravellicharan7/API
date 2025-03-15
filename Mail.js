const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const confirm = require("./Email_messages/mails_messages");

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI = "mongodb+srv://boravellicharan6:PKSLepeo3NSTp5uq@exports-imports.ljt0k.mongodb.net/?retryWrites=true&w=majority&appName=Exports-Imports";

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Booking Schema & Model
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    from_email: { type: String, required: true },
    to_email: { type: String, required: true },
    start_country: { type: String, required: true },
    start_port: { type: String, required: true },
    end_country: { type: String, required: true },
    end_port: { type: String, required: true },
    shipping_invoice: { type: String, required: true },
    delivery_date: { type: String, required: true },
    cost: { type: Number, required: true },
    status: { type: String, default: "Booked" }
});
const Booking = mongoose.model("Booking", bookingSchema);

// Configure Nodemailer transporter with environment variables
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'boravellicharan6@gmail.com',
        pass: 'gcto jwlh iofa isak' 
    },
});

// Send Confirmation Email
function sendConfirmationEmail(booking) {
    setTimeout(() => {
        Booking.findById(booking._id).then(updatedBooking => {
            if (!updatedBooking) {
                console.error(`Error: Booking ${booking._id} not found`);
                return;
            }

            const emailContent = confirm.bookingConfirmation(updatedBooking);

            transporter.sendMail({
                from: "boravellicharan6@gmail.com",
                to: updatedBooking.to_email,
                subject: "Shipping Confirmation Notification",
                html: emailContent,
            }, (error) => {
                if (error) {
                    console.error(`Error sending confirmation email for ${updatedBooking._id}:`, error);
                } else {
                    console.log(`Confirmation email sent successfully to ${updatedBooking.to_email}`);
                }
            });
        });
    }, 2000); // 2 second delay
}

// Send Departure Email
function sendDepartureEmail(booking) {
    setTimeout(() => {
        Booking.findById(booking._id).then(updatedBooking => {
            if (!updatedBooking) {
                console.error(`Error: Booking ${booking._id} not found`);
                return;
            }

            const emailContent = confirm.departureMail(updatedBooking);

            transporter.sendMail({
                from: "boravellicharan6@gmail.com",
                to: updatedBooking.to_email,
                subject: "Shipment Departure Notification",
                html: emailContent,
            }, async (error) => {
                if (error) {
                    console.error(`Error sending departure email for ${updatedBooking._id}:`, error);
                } else {
                    console.log(`Departure email sent successfully to ${updatedBooking.to_email}`);

                    // Update booking status after departure email
                    updatedBooking.status = "In Transit";
                    await updatedBooking.save();
                    console.log(`Status updated to In Transit for booking: ${updatedBooking._id}`);
                }
            });
        });
    }, 30000); // 30 second delay
}

// Send Delivery Email
function sendDeliveryEmail(bookingId) {
    setTimeout(async () => {
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                console.error(`Booking ${bookingId} not found`);
                return;
            }

            const emailContent = confirm.deliveryMail(booking);
            transporter.sendMail({
                from:'boravellicharan6@gmail.com',
                to: booking.to_email,
                subject: "Shipment Delivered Notification",
                html: emailContent,
            }, async (error) => {
                if (error) {
                    console.error(`Error sending delivery email for ${bookingId}:`, error);
                } else {
                    console.log(`Delivery email sent to ${booking.to_email}`);
                    
                    // Update status in the database
                    booking.status = "Delivered";
                    await booking.save();
                }
            });
        } catch (error) {
            console.error(`Error in sendDeliveryEmail for ${bookingId}:`, error);
        }
    }, 40000); // 40 second delay
}

// Get Booking by ID
app.get("/api/booking/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Create Booking & Send Confirmation Email
app.post("/book", async (req, res) => {
    try {
        const { name, from_email, to_email, start_country, start_port, end_country, end_port, shipping_invoice, delivery_date, cost } = req.body;

        if (!name || !from_email || !to_email || !start_country || !start_port || !end_country || !end_port || !shipping_invoice || !delivery_date || !cost) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const booking = new Booking(req.body);
        await booking.save();

        // Send booking confirmation email with timeout
        sendConfirmationEmail(booking);
        
        // Schedule departure email
        sendDepartureEmail(booking);

        res.status(201).json({ 
            message: "Booking created and confirmation email queued for delivery",
            bookingId: booking._id
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Error processing booking", error: error.message });
    }
});

// Automatically Send Delivery Emails on the Delivery Date
setInterval(() => {
    const today = new Date().toISOString().split("T")[0];

    Booking.find({ delivery_date: today, status: "In Transit" })
        .then(pendingDeliveries => {
            pendingDeliveries.forEach((booking, index) => {
                setTimeout(() => {
                    sendDeliveryEmail(booking._id);
                    console.log(`Scheduled delivery email for booking: ${booking._id}`);
                }, 5000 * (index + 1)); 
            });
        })
        .catch(error => {
            console.error("Error processing automated delivery emails:", error);
        });
}, 86400000); // Runs every 24 hours

// Start Server
const PORT = 3078;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
