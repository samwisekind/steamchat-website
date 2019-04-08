const { Router } = require('express');

const { getPodcastsList, getPodcastDetail } = require('../controllers/api');

const router = Router();

router.get('/api/podcasts', getPodcastsList);
router.get('/api/podcasts/:number', getPodcastDetail);

module.exports = router;
