class VehicleController {
    // [GET] /
    index(req, res, next) {
        res.render('vehicle', {
            vehicleActive: true
        });
    }

    assign(req, res, next) {
        res.render('vehicleAssign', {
            vehicleActive: true
        });
    }
}

module.exports = new VehicleController;