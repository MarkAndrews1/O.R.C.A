"use strict";

const express = require("express");
const { validate  } = require("jsonschema");

const Doctor = require("../models/doctor")
const Office = require("../models/office")
const Patient = require("../models/patient")

const router = new express.Router();

const { BadRequestError } = require("../expressError");

const doctorNewSchema = require("../schemas/doctorNew.json");
const officeNewSchema = require("../schemas/officeNew.json");
const patientNewSchema = require("../schemas/patientNew.json");


// Route to create a new doctor
router.post('/doctors', async (req, res, next) => {
    try {
      const doctorData = req.body;

      const val = validate(doctorData, doctorNewSchema);
      if(!val.valid) {
        const errs = val.errors.map(e => e.stack);
        throw new BadRequestError(errs)
      }
  
      const doctorId = await Doctor.create(doctorData);
      return res.status(201).json({ id: doctorId });
    } catch (error) {
      return next(error);
    }
  });

// Route to remove a doctor
router.delete('/doctors/:id', async (req, res, next) => {
    try {
      const doctorId = parseInt(req.params.id);
  
      await Doctor.remove(doctorId);
      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
});

// Route to create a new office
router.post('/offices', async (req, res, next) => {
    try {
        const officeData = req.body;

        const val = validate(officeData, officeNewSchema);
        if(!val.valid){
            const errs = val.errors.map(e => e.stack);
            throw new BadRequestError(errs)
        }

        const officeId = await Office.create(officeData);
        return res.status(201).json({ id: officeId });
    } catch (error) {
        return next(error);
    }
});

// Route to remove an office
router.delete('/offices/:id', async (req, res, next) => {
    try {
        const officeId = parseInt(req.params.id);

        await Office.remove(officeId);
        return res.status(204).end();
    } catch (error) {
        return next(error);
    }
});

// Route to create a new patient
router.post('/patients', async (req, res, next) => {
    try {
        const patientData = req.body;

        const val = validate(patientData, patientNewSchema);
        if(!val.valid){
            const errs = val.errors.map(e => e.stack);
            throw new BadRequestError(errs)
        }

        const patientId = await Patient.create(patientData);
        return res.status(201).json({ id: patientId });
    } catch (error) {
        return next(error);
    }
});

// Route to remove a patient
router.delete('/patients/:id', async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.id);
        await Patient.remove(patientId);
        return res.status(204).end();
    } catch (error) {
        return next(error);
    }
});
  
module.exports = router;