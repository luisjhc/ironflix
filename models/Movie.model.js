const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  director: {
    type: String,
  },

  stars: {
    type: String,
  },

  dateOfRelease: {
    type: String,
  },

  coverPic: {
    type: String,
    required: true,
    default: "",
  },

  description: {
    type: String,
    // min: 20,
  },

  didYouKnow: {
    type: String,
    // min: 20,
  },

  // zoomLink: {
  //   type: String,
  //   default: "https://zoom.us/",
  // },

  trailerLink: {
    type: String,
    default: "",
  },

  reviews: {
    type: String,
    default: "There are no reviews yet for this movie",
  },

  ratings: [
    {
      type: Number,
      default: 3,
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
