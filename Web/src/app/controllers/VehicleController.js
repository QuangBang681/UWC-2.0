class VehicleController {
    // [GET] /
    index(req, res) {
        res.render('vehicle');
    }
}

module.exports = new VehicleController;