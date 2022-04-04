const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctors = require("../model/Doctor.models");
const { successResponse, errorResponse, uniqueId } = require('../helpers');
require("dotenv").config();

exports.createDoctor = async (req, res) => {
    try {
        const { patient, name, email, degree, experience, speciality } = req.body;
        const DoctorData = await Doctors.create(
            { patient, name, email, degree, experience, speciality })
        return successResponse(req, res, DoctorData);
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};
exports.getDoctorPatient = async (req, res) => {
    try {
        const DoctorPatientData = await Doctors.aggregate([
            {
                $lookup: {
                    from: 'Patients',
                    localField: "patient",
                    foreignField: "_id",
                    as: 'patient'
                },
            },
            { $unwind: { path: '$patient' } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    patient: 1
                },
            },
        ]);
        return successResponse(req, res, DoctorPatientData);
    } catch (error) {
        console.log("======> :: error", error);
        return errorResponse(req, res, error.message);
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const DoctorsData = await Doctors.find();
        res.json({ DoctorsData })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
};

exports.fetchDoctorDetails = async (req, res) => {
    try {
        let patientId = req.patient.id;
        let fetchDoctor = await Doctors.findOne({ _id: patientId }).select("-password");
        res.json(fetchDoctor)
    } catch (error) {
        console.log("======> :: error", error);
        res.status(500).send("Internal server error")
    }
};

exports.updateDoctor = async (req, res) => {
    const { name, age, gender, email } = req.body;
    let patient = await Doctors.findById({ _id: req.params.id });
    if (!patient) { return res.status(404).send("Not Found") }

    const newDoctor = {};
    if (name) { newDoctor.name = name };
    if (age) { newDoctor.age = age };
    if (gender) { newDoctor.gender = gender };
    if (email) { newDoctor.email = email };

    patient = await Doctors.findByIdAndUpdate(req.params.id, { $set: newDoctor }, { new: true })
    res.status(200).json({ updatedDoctor: patient });
}

exports.deleteDoctor = async (req, res) => {
    try {
        let patient = await Doctors.findById({ _id: req.params.id });
        if (!patient) { return res.status(404).send("Not Found") }

        patient = await Doctors.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ deletedDoctor: patient });
    } catch (error) {
        console.log("======> :: error", error);
        res.status(500).send("Internal Server Error");
    }
}

exports.getDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const DoctorData = await Doctors.findById({ _id: id });
        res.json({ DoctorData })
    } catch (error) {
        console.log("======> :: error", error);
        res.status(500).send("Internal server error")
    }
};

exports.registerDoctor = async (req, res) => {
    try {
        const { name, email, age, gender } = req.body;

        let findExistingPatient = await Doctors.findOne({ email })
        if (findExistingPatient) {
            return res.status(404).send("User already Exist")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const patientData = await Doctors.create(
            { name, email, password: hashedPassword, age, gender })

        const patient = {
            id: patientData.id
        }
        const authToken = jwt.sign(patient, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })
        res.json({ authToken })
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

exports.loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        let findPatient = await Doctors.findOne({ email })
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