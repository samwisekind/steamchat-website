const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
  active: Boolean,
  slug: String,
  type: { type: String, enum: ['episode', 'snack'] },
  number: Number,
  title: String,
  description: String,
  releaseDate: Date,
  fileSize: Number,
  fileURL: String,
  fileDuration: String,
  transcriptURL: String,
  category: String,
  mask: String,
  colour: String,
  background: String,
}, {
  timestamps: true,
});

const Podcast = mongoose.model('podcast', PodcastSchema);

module.exports = Podcast;
