const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const BackOfficerSchema = new mongoose.Schema(
    {
        _id: {type: ObjectId, required: true},

        username: { type: String, required: true, unique: true},
        password: { type: String, required: true }
    },
    {collection: 'backofficer'}
);

module.exports = mongoose.model('backofficer', BackOfficerSchema);