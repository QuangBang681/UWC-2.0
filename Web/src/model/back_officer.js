const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const BackOfficerSchema = new mongoose.Schema(
    {
        _id: { type: ObjectId, required: true, unique: true},

        username: { type: String, required: true, unique: true},
        password: { type: String, required: true }
    },
    { collation: 'back_officer'}
);

module.exports = mongoose.model('BackOfficer', BackOfficerSchema)