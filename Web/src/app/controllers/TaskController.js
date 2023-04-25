class TaskController {
    // [GET] /
    index(req, res) {
        res.render('task', {
            taskActive: true
        });
    }

    filter(req, res) {
        
    }

    create(req, res) {
        res.render('create');
    }
}

module.exports = new TaskController;