class EmployeeController {
    index(req, res) {
        res.render('employee');
    }
}

module.exports = new EmployeeController;