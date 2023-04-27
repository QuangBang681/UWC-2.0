const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { EmployeeSchema } = require('./employee');

const VehicleSchema = new mongoose.Schema(
    {
        type: {type: String, require: true, unique: true},
        assign_empolyee: {type: ObjectId, unique: true, ref: 'Employee'},
        weight_capacity: {type: Number, require: true},
        volume_capacity: {type: Number, require: true},
        fuel_consumption: {type: Number, require: true}

    },
    {collection: 'vehicle'}
);

module.exports = mongoose.model('Vehicle', VehicleSchema);