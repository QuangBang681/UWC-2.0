const task = require('../models/task');

class TaskController {
    // [GET] /
    index(req, res, next) {
        task.find()
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
                    task.date_str = `${task.date.getDate()}/${task.date.getMonth()}/${task.date.getFullYear()}`;
                })
                res.render('task', {
                    tasks: tasks,
                    taskActive: true
                });
            })
            .catch(next);
        
    }

    filter(req, res) {
        
    }

    create(req, res, next) {
        var time_start = req.body['time-start'];
        var time_end = req.body['time-end'];
        var date = req.body['date-assign'];
        if (!time_start || !time_end || !date) {
            return res.redirect('back');
        }
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

    destroy(req, res, next) {
        task.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new TaskController;