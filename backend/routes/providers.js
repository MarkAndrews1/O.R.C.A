const express = require("express");

const { UnauthorizedError, NotFoundError } = require('../expressError');
const Provider = require("../models/provider");
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor")
const Office = require("../models/office")


const { createToken } = require("../helpers/tokens")

const router = express.Router();

// Route to get a provider by ID
router.get('/:id', async (req, res, next) => {
    try {
        const providerId = parseInt(req.params.id);

        // Call the getProvider method to retrieve the provider by ID
        const provider = await Provider.getProvider(providerId);

        // If provider is found, send it in the response
        res.json({ provider });
    } catch (error) {
        // Handle errors
        if (error instanceof NotFoundError) {
            // Return 404 Not Found if provider is not found
            return res.status(404).json({ error: error.message });
        }
        // For other errors, pass to the error handler middleware
        next(error);
    }
});


// Route to authenticate and log in a provider
router.post('/login', async (req, res, next) => {
    try {
        const { provider_email, provider_password } = req.body;
        // Authenticate the provider
        const provider = await Provider.authenticate(provider_email, provider_password);

        const token = createToken(provider);

        res.json({ token });
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return res.status(401).json({ error: error.message });
        }
        next(error);
    }
});

router.post("/:id/toggle-admin", async function (req, res, next) {
    try {
        const providerId = req.params.id;
        const { status } = req.body
        const newAdminStatus = await Provider.toggleAdmin({providerId: providerId, status:status});
        return res.json({ admin: newAdminStatus });
    } catch (err) {
        return next(err);
    }
});


// Route to get all patients for a provider
router.get("/:id/patients", async (req, res, next) => {
    try {
        const providerId = req.params.id;
        const patients = await Provider.getAllPatients(providerId);
        res.json({ patients });
    } catch (error) {
        next(error);
    }
});

// Route to get all doctors for a provider
router.get("/:id/doctors", async (req, res, next) => {
    try {
        const providerId = req.params.id;
        const doctors = await Provider.getAllDoctors(providerId);
        res.json({ doctors });
    } catch (error) {
        next(error);
    }
});

router.get("/doctors/:id", async (req, res, next) => {
    try {
        const doctor_id = req.params.id;
        const doctor = await Doctor.getDoctor(doctor_id);
        res.json({ doctor });
    } catch (error) {
        next(error);
    }
});

// Route to get a doctor from first_name, last_name, and provider_id
router.post('/find-doctor', async (req, res, next) => {
    try {
        const data = req.body;

        const doctor = await Doctor.findDoctor(data);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        return res.status(200).json({ doctor });
    } catch (error) {
        return next(error);
    }
});


// Route to get all offices for a provider
router.get("/:id/offices", async (req, res, next) => {
    try {
        const providerId = req.params.id;
        const offices = await Provider.getAllOffices(providerId);
        res.json({ offices });
    } catch (error) {
        next(error);
    }
});

router.get("/offices/:id", async (req, res, next) => {
    try {
        const office_id = req.params.id;
        const office = await Office.getOffice(office_id);
        res.json({ office });
    } catch (error) {
        next(error);
    }
});

router.post('/find-office', async (req, res, next) => {
    try {
        const data = req.body;

        const office = await Office.findOffice(data);

        if (!office) {
            return res.status(404).json({ message: "Office not found" });
        }

        return res.status(200).json({ office });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        return next(error);
    }
});

// Route to create a new appointment
router.post("/appointments", async (req, res, next) => {
    try {
        const appointmentData = req.body;
        const appointment = await Appointment.create(appointmentData);
        res.status(201).json(appointment);
    } catch (error) {
        next(error);
    }
});

// Route to get all appointments by doctor
router.get("/doctors/:id/appointments", async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const appointments = await Appointment.getByDoctor(doctorId);
        res.json({ appointments });
    } catch (error) {
        next(error);
    }
});

// Route to get all appointments by patient
router.get("/patients/:id/appointments", async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const appointments = await Appointment.getByPatient(patientId);
        res.json({ appointments });
    } catch (error) {
        next(error);
    }
});

router.post("/find-appointment", async (req, res, next) => {
    try {
        const data = req.body;

        const appointment = await Appointment.findAppointment(data);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        return res.status(200).json({ appointment });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ message: error.message });
        }
        return next(error);
    }
})

// Route to remove an appointment
router.delete("/appointments/:id", async (req, res, next) => {
    try {
        const appointmentId = req.params.id;
        await Appointment.remove(appointmentId);
        res.status(204).end();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }

});

module.exports = router;
