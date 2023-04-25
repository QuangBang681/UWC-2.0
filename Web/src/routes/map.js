const express = require('express');
const router = express.Router();

const mapController = require('../app/controllers/MapController');

router.get('/', mapController.index);

module.exports = router;