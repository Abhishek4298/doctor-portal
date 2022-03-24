const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    tag: {
        type: String,
        default: "General"
    },
},
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Notes', NotesSchema);
