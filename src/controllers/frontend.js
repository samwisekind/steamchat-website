const sanitize = require('mongo-sanitize');

const Podcast = require('../models/podcast');

const { QUERYFILTER } = require('../helpers/constants');
const errorHandler = require('../helpers/errorHandler');

const showPodcastDetail = async ({ params }, res) => {
  try {
    const episode = await Podcast.findOne({ number: sanitize(params.number) })
      .sort('-releaseDate')
      .select(QUERYFILTER);

    if (!episode) throw new Error(404);

    const previous = null;
    const next = null;

    res.render('detail', { episode, previous, next });
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

module.exports = {
  showPodcastDetail,
};
