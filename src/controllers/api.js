const sanitize = require('mongo-sanitize');

const Podcast = require('../models/podcast');

const { QUERYFILTER } = require('../helpers/constants');
const errorHandler = require('../helpers/errorHandler');

const getPodcastsList = async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .select(QUERYFILTER);

    if (!podcasts) throw new Error(404);

    res.json(podcasts);
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

const getPodcastDetail = async ({ params }, res) => {
  try {
    const podcast = await Podcast.findOne({ number: sanitize(params.number) })
      .select(QUERYFILTER);

    if (!podcast) throw new Error(404);

    res.json(podcast);
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

module.exports = {
  getPodcastsList,
  getPodcastDetail,
};
