const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patients = require("../model/Patient.models");

require("dotenv").config();

exports.getPatients = async (req, res) => {
  try {
    const PatientsData = await Patients.find();
    res.json({ PatientsData })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
};

exports.fetchPatientDetails = async (req, res) => {
  try {
    let patientId = req.patient.id;
    let fetchPatient = await Patients.findOne({ _id: patientId }).select("-password");
    res.json(fetchPatient)
  } catch (error) {
    res.status(500).send("Internal server error")
  }
};


exports.register = async (req, res) => {
  try {
    const { name, email, age, gender } = req.body;

    let findExistingPatient = await Patients.findOne({ email })
    if (findExistingPatient) {
      return res.status(404).send("User already Exist")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const patientData = await Patients.create(
      { name, email, password: hashedPassword, age, gender })

    const patient = {
      id: patientData.id
    }
    const authToken = jwt.sign(patient, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
    res.status(200).json({ authToken });
  } catch (error) {
    if (error.name == 'ValidationError') {
      if (error.errors.name) {
        res.status(422).json(error.errors.name.message);
      }
      if (error.errors.email) {
        res.status(422).json(error.errors.email.message);
      }
      if (error.errors.age) {
        res.status(422).json(error.errors.age.message);
      }
      if (error.errors.gender) {
        res.status(422).json(error.errors.gender.message);
      }
      if (error.errors.password) {
        res.status(422).json(error.errors.password.message);
      }
    }
    else {
      res.status(500).json("Something went wrong");
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let findPatient = await Patients.findOne({ email })
    if (!findPatient) return res.status(404).json({ msg: "Incorrect Credentials" })

    const passwordCompare = await bcrypt.compare(password, findPatient.password)
    if (!passwordCompare) return res.status(404).json({ msg: "Incorrect Credentials" })

    const patient = {
      id: findPatient.id,
    }
    const authToken = jwt.sign(patient, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
    res.json({ authToken })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
};

exports.updatePatient = async (req, res) => {
  const { name, age, gender, email } = req.body;
  let patient = await Patients.findById({ _id: req.params.id });
  if (!patient) { return res.status(404).send("Not Found") }

  const newPatient = {};
  if (name) { newPatient.name = name };
  if (age) { newPatient.age = age };
  if (gender) { newPatient.gender = gender };
  if (email) { newPatient.email = email };

  patient = await Patients.findByIdAndUpdate(req.params.id, { $set: newPatient }, { new: true })
  res.status(200).json({ updatedPatient: patient });
}

exports.deletePatient = async (req, res) => {
  try {
    let patient = await Patients.findById({ _id: req.params.id });
    if (!patient) { return res.status(404).send("Not Found") }

    patient = await Patients.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json({ deletedPatient: patient });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

exports.getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const PatientData = await Patients.findById({ _id: id });
    res.json({ PatientData })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
};
