class MapController {
    // [GET] /
    index(req, res) {
        res.render('map');
    }
}

module.exports = new MapController;