const task = require('../models/task');
const employee = require('../models/employee');

function convertStrToTime(str) {
    var hour = str.slice(0, 2);
    var min = str.slice(3, 5);
    var mer = str.slice(6, 8);
    hour = parseInt(hour);
    min = parseInt(min);
    if (mer === 'pm') {
        hour = hour + 12;
    }
    return hour*60 + min;
};

class TaskController {
    
    // [GET] /
    index(req, res, next) {
        const filter = {};
        if (Object.keys(req.query).length === 0) {
            
        } else {
            const { date, state, id_employee} = req.query;
            if (!date && !state && !id_employee) {
                return res.render('task', {
                    taskActive: true
                });
            } else {
                if (date) filter.date = date;
                if (state) filter.state = state;
            }
        }
        task.find(filter)
            .then(tasks => {
                tasks = tasks.map(tasks => tasks.toObject());
                tasks.forEach(task => {
                    if (task.state === 0) {
                        task.notYet = true;
                    } else if (task.state === 1) {
                        task.inProgress = true;
                    } else if (task.state === 2) {
                        task.done = true;
                    }
                    var month = (task.date.getMonth() + 1).toString();
                    var day = task.date.getDate().toString();
                    if (task.date.getMonth() < 10) {
                        month = "0" + month;
                    }
                    if (task.date.getDate() < 10) {
                        day = "0" + day;
                    }
                    task.date_str = `${day}/${month}/${task.date.getFullYear()}`;
                })
                res.render('task', {
                    tasks: tasks,
                    taskActive: true
                });
            })
            .catch(next);
    }
    // [POST] / :id
    create(req, res, next) {
        var time_start = req.body['time-start'];
        var time_end = req.body['time-end'];
        var date = req.body['date-assign'];
        if (!time_start || !time_end || !date) {
            return res.redirect('back');
        }
        
        if (convertStrToTime(time_end) - convertStrToTime(time_start) < 0) {
            return res.redirect('back');
        } else {
            task.create({
                date: new Date(date),
                time_start: time_start,
                time_end: time_end,
                state: 0
            })
                .then(() => {
                    return res.redirect('back');
                })
                .catch(next)
        }
    }

    // [DELETE] / :id
    destroy(req, res, next) {
        task.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] / :id
    update(req, res, next) {
        var time_start = req.body['time-start'];
        var time_end = req.body['time-end'];
        var date = req.body['date-assign'];
        if (!time_start || !time_end || !date) {
            return res.redirect('back');
        }
        if (convertStrToTime(time_end) - convertStrToTime(time_start) < 0) {
            return res.redirect('back');
        } else {
            task.findByIdAndUpdate(req.params.id,
                {
                    date: new Date(date),
                    time_start: time_start,
                    time_end: time_end,
                }
            )
                .then(() => {
                    return res.redirect('back');
                })
                .catch(next)
        }
    }

    // [GET] / :id / assign
    assign(req, res, next) {
        // mcp.find()
        //     .then()
        employee.find({
            position: "janitor",
            assign_MCP: false
        })
            .then(employees => {
                employees = employees.map(employee => employee.toObject());
                res.render('taskAssign', {
                    taskActive: true,
                    employees: employees,
                })
            })
        
    }
}

module.exports = new TaskController;