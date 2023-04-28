const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { EmployeeSchema } = require('./employee');

const MCPSchema = new mongoose.Schema(
    {
        id: {type: String, required: true},
        location: {type: String, required: true},
        capacity: [{type: Number, required: true}],
        fill_percentage: {type: Number, required: true},
    },
    {collection: 'mcp'}
);

module.exports = mongoose.model('Mcp', MCPSchema);