const sanitize = require('mongo-sanitize');

const Podcast = require('../models/podcast');

const { QUERYFILTER } = require('../helpers/constants');
const errorHandler = require('../helpers/errorHandler');

const getPodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findOne({ number: sanitize(req.params.number) })
      .select(QUERYFILTER);

    if (!podcast) {
      throw new Error(404);
    }

    res.render('index');
  } catch (error) {
    res.status(error.message).json(errorHandler(error.message));
  }
};

module.exports = { getPodcast };
