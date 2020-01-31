const { Router } = require('express');

const { getPodcastsList, getPodcastDetail } = require('../controllers/api');
const { showPodcastDetail } = require('../controllers/frontend');

const router = Router();

router.get('/api/podcasts', getPodcastsList);
router.get('/api/podcasts/:number', getPodcastDetail);

router.get('/episode/:number', showPodcastDetail);

module.exports = router;
