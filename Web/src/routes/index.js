const siteRouter = require('./site');   
const loginRouter = require('./login');

const taskRouter = require('./task');
const employeeRouter = require('./employee');
const vehicleRouter = require('./vehicle');
const mapRouter = require('./map');


function route(app) {
    
    app.use('/task', taskRouter);
    app.use('/employee', employeeRouter);
    app.use('/vehicle', vehicleRouter);
    app.use('/map', mapRouter);

    app.use('/login', loginRouter);
    app.use('/', siteRouter);
}

module.exports = route;