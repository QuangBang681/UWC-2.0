class TaskController {
    // [GET] /
    index(req, res) {
        res.render('task');
    }

    filter(req, res) {
        
    }
}

module.exports = new TaskController;