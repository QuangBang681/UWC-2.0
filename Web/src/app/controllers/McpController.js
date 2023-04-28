const employee = require('../models/employee');
const map = require('../models/mcp');

class MapController {
    // [GET] /
    index(req, res, next) {
        map.find({
            state: true
        })
            .then(async maps => {
                maps = maps.map(map => map.toObject());
                console.log(map)
                var promises = maps.map(async map => {
                    var employeeObj = await employee.findById(map.assign_empolyee)
                    map.employee_name = employeeObj.name;
                    if (map.state === 0) {
                        map.notYet = true;
                    } else if (map.state === 1) {
                        map.collecting = true;
                    } else if (map.state === 2) {
                        map.moving = true;
                    } else if (map.state === 3) {
                        map.done = true;
                    }
                    return map;
                })
                Promise.all(promises)
                    .then(maps => {
                        return res.render('map', {
                            maps: maps,
                            mapActive: true
                        });
                    })
                    .catch(next);
                
            })
            .catch(next);
        
    }

    // [POST] /
    create(req, res, next) {
        var location = req.body['location'];
        var capacity = req.body['capacity'];
        var fill_percentage = req.body['fill_percentage'];
        if (!time_start || !time_end || !date) {
            return res.redirect('back');
        }
        
        map.create({
            location: location,
            capacity: capacity,
            fill_percentage: fill_percentage
        })
            .then(() => {
                return res.redirect('back');
            })
            .catch(next)
    }

    
    // [DELETE] / :id
    destroy(req, res, next) {
        task.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] / assign /
    assign(req, res, next) {
        employee.find({
            position: 'janitor',
            assign_MCP: false
        })
            .then((employees) => {
                employees = employees.map((employee) => employee.toObject());
                res.render('mapAssign', {
                    mapActive: true,
                    employees: employees
                });
            })
            .catch(next);
    }

    // [PATCH] / :id
    update(req, res, next) {

        var location = req.body['location'];
        var capacity = req.body['capacity'];
        var fill_percentage = req.body['fill_percentage'];
        if (!time_start || !time_end || !date) {
            return res.redirect('back');
        }
            task.findByIdAndUpdate(req.params.id,
                {
                    location: location,
                    capacity: capacity,
                    fill_percentage: fill_percentage
                }
            )
                .then(() => {
                    return res.redirect('back');
                })
                .catch(next)
    }

    // [PATCH] / assign / :map_id/ :employee_id
    async assignment(req, res, next) {
        //"TODO"
    }

    // [PATCH] / :id
    async unassignment(req, res, next) {
        const mapObj = await map.findById(req.params.id);
        const employeeId = mapObj.assign_empolyee;
        
        mapObj.assign_empolyee = undefined;
        mapObj.state = 0;
        mapObj.assigned = false;
        
        await mapObj.save();

        await employee.findByIdAndUpdate(employeeId, {
            assign_map: false
        })

        return res.redirect('/map');
    }
}

module.exports = new MapController;