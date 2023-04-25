const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { EmployeeSchema } = require('./employee');

const VehicleSchema = new mongoose.Schema(
    {
        _id: {type: ObjectId, required: true},

        type: {type: String, require: true, unique: true},
        assign_empolyee: {type: ObjectId, unique: true, ref: 'Employee'},
    },
    {collection: 'vehicle'}
);

module.exports = mongoose.model('Vehicle', VehicleSchema);