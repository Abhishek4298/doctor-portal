const mongoose = require("mongoose");
const validator = require('validator');
const Schema = mongoose.Schema;

const Doctors = new Schema(
    {
        patient: { type: mongoose.Schema.ObjectId, ref: 'Patients' },
        name: {
            type: String,
            minlength: [2, 'Name must be at least 2 characters.'],
            maxlength: [20, 'Name must be less than 20 characters.'],
            required: [true, 'Your Name cannot be blank.'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email cannot be blank.'],
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is inValid");
                }
            }
        },
        password: {
            type: String,
            minlength: [1, 'Password can not be less then 0.'],
        },
        degree: {
            type: String,
            required: [true, 'password cannot be blank.'],
            minlength: [1, 'Password can not be less then 0.'],
        },
        experience: {
            type: String,
        },
        speciality: {
            type: String,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    },
    { versionKey: false }
);

module.exports = mongoose.model('Doctors', Doctors, 'Doctors');


