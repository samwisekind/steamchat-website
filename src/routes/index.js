const { Router } = require('express');

const { getPodcast } = require('../controllers');

const router = Router();

router.get('/podcast/:number', getPodcast);

module.exports = router;
