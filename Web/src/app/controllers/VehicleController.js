class VehicleController {
    // [GET] /
    index(req, res) {
        res.render('vehicle', {
            vehicleActive: true
        });
    }
}

module.exports = new VehicleController;