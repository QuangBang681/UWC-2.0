const employee = require('../models/employee');
const vehicle = require('../models/vehicle');

class VehicleController {
    // [GET] /
    index(req, res, next) {
        vehicle.find({
            assigned: true
        })
            .then(async vehicles => {
                vehicles = vehicles.map(vehicle => vehicle.toObject());
                var promises = vehicles.map(async vehicle => {
                    var employeeObj = await employee.findById(vehicle.assign_empolyee)
                    vehicle.employee_name = employeeObj.name;
                    if (vehicle.state === 0) {
                        vehicle.notYet = true;
                    } else if (vehicle.state === 1) {
                        vehicle.collecting = true;
                    } else if (vehicle.state === 2) {
                        vehicle.moving = true;
                    } else if (vehicle.state === 3) {
                        vehicle.done = true;
                    }
                    return vehicle;
                })
                Promise.all(promises)
                    .then(vehicles => {
                        return res.render('vehicle', {
                            vehicles: vehicles,
                            vehicleActive: true
                        });
                    })
                    .catch(next);
            })
            .catch(next);
        
    }

    // [GET] / assign /
    assign(req, res, next) {
        vehicle.find({
            type: 'collecting',
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

    // [PATCH] / assign / :vehicle_id/ :employee_id
    assignment(req, res, next) {
        vehicle.findByIdAndUpdate(req.params.vehicle_id,{
            state: 0,
            assigned: true,
            assign_empolyee: req.params.employee_id
        })
            .then(() => {
                employee.findByIdAndUpdate(req.params.employee_id, {
                    assign_vehicle: true
                })
                    .then(() => res.redirect('/vehicle'))
                    .catch(next);
            })
            .catch(next);
    }

    // [PATCH] / :id
    async unassignment(req, res, next) {
        const vehicleObj = await vehicle.findById(req.params.id);
        const employeeId = vehicleObj.assign_empolyee;
        
        vehicleObj.assign_empolyee = undefined;
        vehicleObj.state = 0;
        vehicleObj.assigned = false;
        
        await vehicleObj.save();

        await employee.findByIdAndUpdate(employeeId, {
            assign_vehicle: false
        })

        return res.redirect('/vehicle');
    }
}

module.exports = new VehicleController;