class MapController {
    // [GET] /
    index(req, res) {
        res.render('map', {
            mapActive: true
        });
    }
}

module.exports = new MapController;