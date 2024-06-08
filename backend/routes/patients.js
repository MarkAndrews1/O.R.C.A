const express = require("express");
const Patient = require("../models/patient");
const Appointment = require("../models/appointment");

const router = express.Router();

const { createPatientToken } = require("../helpers/tokens")

const { BadRequestError, NotFoundError } = require("../expressError");

// Route get a patient by their id
router.get('/:id', async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.id);
        const patient = await Patient.getPatient(patientId);
        res.json({ patient });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            next(error);
        }
    }
});

// Route to find a patient by phone number and date of birth
router.post('/find-patient', async (req, res, next) => {
    try {
        const { phone_num, date_of_birth } = req.body;

        if (!phone_num || isNaN(phone_num)) {
            return res.status(400).json({ message: "Invalid or missing phone_num. It must be a number." });
        }
        if (!date_of_birth || isNaN(Date.parse(date_of_birth))) {
            return res.status(400).json({ message: "Invalid or missing date_of_birth. It must be a valid date." });
        }

        const patient = await Patient.findPatient(phone_num, date_of_birth);
        return res.status(200).json({ patient });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        return next(error);
    }
});


/** Route to authenticate and log in a patient */
router.post('/login', async (req, res, next) => {
    try {
        const { phone_num, date_of_birth } = req.body;

        // Authenticate the patient
        const patient = await Patient.findPatient(phone_num, date_of_birth);


        // If authentication is successful, create a JWT token
        const token = createPatientToken(patient);

        // Return the token in the response
        res.json({ token });
    } catch (error) {
        // Handle authentication errors
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        } else if (error instanceof BadRequestError) {
            return res.status(400).json({ error: error.message });
        }
        // For other errors, pass to the error handler middleware
        next(error);
    }
});

// Route to get providers for a patient
router.get("/:id/providers", async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const providers = await Patient.getProviders(patientId);
        res.json({ providers });
    } catch (error) {
        next(error);
    }
});

// Route to get all appointments by patient
router.get("/:id/appointments", async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const appointments = await Appointment.getByPatient(patientId);
        res.json({ appointments });
    } catch (error) {
        next(error);
    }
});

module.exports = router;