const express = require("express");
const router = express.Router();
const { getPatients, getPatient, login, register, fetchPatientDetails, updatePatient, deletePatient } = require("../controller/Patients.controller");
const jwtVerify = require("../middleware/jwtVerify");

router.use((req, res, next) => {
  console.log(`${req.method}:${req.headers.host}${req.originalUrl}`);
  next();
});

// Authentication
router.post("/login", login);
router.post("/register", register);

// Patient
router.get("/patients", getPatients);
router.get("/patient/:id", getPatient);
router.get("/fetchPatientDetail", jwtVerify, fetchPatientDetails);
router.put("/patient/:id", updatePatient);
router.delete("/patient/:id", deletePatient);

module.exports = router;
