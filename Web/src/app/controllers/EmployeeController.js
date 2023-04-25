const employee = require('../models/employee');

class EmployeeController {
    index(req, res) {
        employee.find()
            .then(employeesOb => {
                const employees = employeesOb.map(employee => {
                    var positonVal = 0;
                    if (employee.position === 'collector') {
                        positonVal = 1;
                    }
                    return {
                        name: employee.name,
                        position: positonVal
                    }
                })
                res.render('employee', {
                    employeeActive: true,
                    employees: employees
                });
            })
            .catch(err => console.log(err));
        
    }
}

module.exports = new EmployeeController;