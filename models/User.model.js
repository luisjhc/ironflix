const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  age: {
    type: Number,
    //required: true,
  },

  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/dertdncse/image/upload/v1617609719/User/defaultProfilePic_aytzpz.jpg",
  },

  shortBio: {
    type: String,
  },

  prefersDarkMode: {
    type: Boolean,
    default: false,
  },

  favouriteList: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

const User = model("User", userSchema);

module.exports = User;
