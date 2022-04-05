const express = require("express");
const router = express.Router();
const { login, register, getPatients, getPatient, fetchPatientDetails, updatePatient, deletePatient } = require("../controller/Patients.controller");
const { registerDoctor, loginDoctor, createDoctor, getDoctorPatient, getDoctors, fetchDoctorDetails, updateDoctor, deleteDoctor, getDoctor } = require("../controller/Doctors.controller");
const session = require('express-session');
const passport = require('passport');
require('../middleware/passportAuth');

const jwtVerify = require("../middleware/jwtVerify");

router.use((req, res, next) => {
  console.log(`${req.method}:${req.headers.host}${req.originalUrl}`);
  next();
});

// Authentication Patient
router.post("/login", login);
router.post("/register", register);

// Authentication Doctor
router.post("/doctor/login", loginDoctor);
router.post("/doctor/register", registerDoctor);


// Patient
router.get("/patients", getPatients);
router.get("/patient/:id", getPatient);
router.get("/fetchPatientDetail", jwtVerify, fetchPatientDetails);
router.put("/patient/:id", updatePatient);
router.delete("/patient/:id", deletePatient);

router.post("/doctor", createDoctor);
router.get("/doctors", getDoctors);
router.get("/doctorPatients", getDoctorPatient);
router.get("/doctor/:id", getDoctor);
router.get("/fetchPatientDetail", jwtVerify, fetchDoctorDetails);
router.put("/doctor/:id", updateDoctor);
router.delete("/doctor/:id", deleteDoctor);

// GOogle auth
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get('/google', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

router.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

router.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


module.exports = router;
