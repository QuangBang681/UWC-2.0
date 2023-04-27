const employee = require('../models/employee');
const vehicle = require('../models/vehicle');

class VehicleController {
    // [GET] /
    index(req, res, next) {
        res.render('vehicle', {
            vehicleActive: true
        });
    }

    assign(req, res, next) {
        vehicle.find({
            assigned: false
        })
            .then((vehicles) => {
                vehicles = vehicles.map(vehicle => vehicle.toObject());
                employee.find({
                    position: 'collector',
                    assign_vehicle: false
                })
                    .then((employees) => {
                        employees = employees.map((employee) => employee.toObject());
                        res.render('vehicleAssign', {
                            vehicleActive: true,
                            employees: employees,
                            vehicles: vehicles
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }
}

module.exports = new VehicleController;