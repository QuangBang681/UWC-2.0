const employee = require('../models/employee');

class EmployeeController {
    index(req, res) {
        employee.find()
            .then(employeesOb => {
                const employees = employeesOb.map(employee => {
                    var collector = false;
                    if (employee.position === 'collector') {
                        collector = true;
                    }
                    return {
                        _id: employee._id,
                        name: employee.name,
                        collector: collector
                    }
                })
                res.render('employee', {
                    employeeActive: true,
                    employees: employees
                });
            })
            .catch(err => console.log(err));
    }

    makeChanges(req, res) {
        res.json(req.body);
    }
}

module.exports = new EmployeeController;