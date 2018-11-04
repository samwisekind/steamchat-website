import sanitize from 'mongo-sanitize';

import Podcast from 'models/podcast';

import { QUERYFILTER } from 'helpers/constants';
import errorHandler from 'helpers/errorHandler';

const getPodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findOne({ number: sanitize(req.params.number) })
      .select(QUERYFILTER);

    if (!podcast) {
      throw new Error(404);
    }

    res.json(podcast);
  } catch (error) {
    res.status(error.message).json(errorHandler(error.message));
  }
};

export { getPodcast };
