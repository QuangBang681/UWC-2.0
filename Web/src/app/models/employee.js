const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const EmployeeSchema = new mongoose.Schema(
    {
        _id: {type: ObjectId, required: true},

        name: {type: String, required: true},
        position: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phone_number: {type: String, required: true, unique: true},
    },
    {collection: 'employee'}
);

module.exports = mongoose.model('Employee', EmployeeSchema);