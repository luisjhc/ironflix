const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/ironflix";

// Created our own  Movies db:
const movies = [
  {
    title: "Avengers: Endgame.",
    director: "Anthony Russo, Joe Russo",
    stars: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    dateOfRelease: 2019,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818892/ironflix/IMG_5324_mo1wfa.jpg",
    description:
      "The universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    didYouKnow:
      "'Avengers: Endgame' is the first film to reach over a billion dollars during its opening weekend in theaters.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    stars: ["Marlon Brando", "Al Pacino", "James Caan"],
    dateOfRelease: 1972,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818983/ironflix/IMG_5393_ueuo9u.jpg",
    description:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    didYouKnow:
      "Marlon Brando wanted to make Don Corleone look like a bulldog, so he stuffed his cheeks with cotton wool for the audition. For the actual filming, he wore a mouthpiece made by a dentist. This appliance is on display in the American Museum of the Moving Image in Queens, New York.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "The Lord of the Rings: The Keepers of the Ring ",
    director: "Peter Jackson",
    stars: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    dateOfRelease: 2001,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818932/ironflix/IMG_5343_bitgrh.jpg",
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    didYouKnow:
      "Director Peter Jackson gave one of the rings used in the movies to Elijah Wood and Andy Serkis as a gift when the shoot was finished. They both thought they had the only one.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "Joker",
    director: "Todd Phillips",
    stars: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz "],
    dateOfRelease: 2019,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818878/ironflix/IMG_5314_xg8tp6.jpg",
    description:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    didYouKnow:
      "Joaquin Phoenix based his laugh on videos of people suffering from pathological laughter. He also sought to portray a character with which audiences could not identify.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "IT",
    director: "Andy Muschietti",
    stars: ["Jaeden Martell", "Bill Skarsgård", "Finn Wolfhard"],
    dateOfRelease: 2017,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818878/ironflix/IMG_5313_uxxb3u.jpg",
    description:
      "The story of seven children in Derry, Maine, who are terrorized by the eponymous being, only to face their own personal demons in the process.",
    didYouKnow:
      "The Child Actors Didn’t See Bill Skarsgård (Pennywise the clown) In Costume Until Filming Began",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "Corpse Bride ",
    director: "Tim Burton, Mike Johnson",
    stars: ["Johnny Depp", "Helena Bonham Carter", "Emily Watson"],
    dateOfRelease: 2005,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818880/ironflix/IMG_5316_xt78pj.jpg",
    description:
      "When a shy groom practices his wedding vows in the inadvertent presence of a deceased young woman, she rises from the grave assuming he has married her.",
    didYouKnow: "This is the only Warner Bros.' stop-motion animated film.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "1917",
    director: "Sam Mendes",
    stars: ["Dean-Charles Chapman", "George MacKay", "Daniel Mays"],
    dateOfRelease: 2019,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818883/ironflix/IMG_5320_cwsgap.jpg",
    description:
      "April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
    didYouKnow:
      "The lighting rig used for the burning church was five stories high and consisted of 2,000 1K tungsten lamps, a total of 2 megawatts. It was one of, if not the largest, lighting rigs ever built for a film.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "The Shining",
    director: " Stanley Kubrick",
    stars: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
    dateOfRelease: 1980,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617908345/ironflix/IMG_5338_gs5qkl.jpg",
    description:
      "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    didYouKnow:
      "To get Jack Nicholson in the right agitated mood, he was fed only cheese sandwiches for two weeks, which he hates.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "Coco",
    director: " Lee Unkrich, Adrian Molina ",
    stars: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt"],
    dateOfRelease: 2017,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818898/ironflix/IMG_5332_o8hslh.jpg",
    description:
      "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    didYouKnow:
      "The look of the Land of the Dead is inspired by the Mexican city of Guanajuato, which has colorful houses placed on the hillsides in such a way that they look almost stacked.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "The Lion King",
    director: "Jon Favreau",
    stars: ["Donald Glover", "Beyoncé", "Seth Rogen"],
    dateOfRelease: 2019,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818905/ironflix/IMG_5333_pnejwj.jpg",
    description:
      "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    didYouKnow:
      "Favreau used virtual reality tech to walk around the virtual set and design shots, treating it like a real location.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    director: "Irvin Kershner",
    stars: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    dateOfRelease: 1980,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818923/ironflix/IMG_5342_zjwqok.jpg",
    description:
      "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
    didYouKnow:
      "The blasters used by the stormtroopers were constructed from Sterling L2A3 Mk 4 submachine guns.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "Cast Away",
    director: "Robert Zemeckis",
    stars: ["Tom Hanks", "Helen Hunt", "Paul Sanchez"],
    dateOfRelease: 2000,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818944/ironflix/IMG_5345_rko2hp.jpg",
    description:
      "A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.",
    didYouKnow:
      "Actual lines of dialogue were written for Wilson the volleyball, to help Tom Hanks have a more natural interaction with the inanimate object.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "The Matrix",
    director: "The Wachowski Brothers",
    stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    dateOfRelease: 1999,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818956/ironflix/IMG_5346_bikgm2.jpg",
    description:
      "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    didYouKnow:
      "Neo is often referred to as the 'One', which is an anagram of 'Neo'",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "Gladiator",
    director: "Ridley Scott",
    stars: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen "],
    dateOfRelease: 2000,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818969/ironflix/IMG_5348_reizka.jpg",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    didYouKnow:
      "Maximus' description of his home--specifically, how the kitchen is arranged and smells in the morning and at night--was ad-libbed. It's a description of Russell Crowe's own home in Australia.",
    // reviews: "",
    // ratings: [Number],
  },

  {
    title: "Pirates of the Caribbean: Dead Man's Chest ",
    director: "Gore Verbinski",
    stars: ["Johnny Depp", "Orlando Bloom", "Keira Knightley"],
    dateOfRelease: 2006,
    coverPic:
      "https://res.cloudinary.com/dgmm3pkuc/image/upload/v1617818913/ironflix/IMG_5341_zu5uvu.jpg",
    description:
      "Jack Sparrow races to recover the heart of Davy Jones to avoid enslaving his soul to Jones' service, as other friends and foes seek the heart for their own agenda as well.",
    didYouKnow:
      "All of Davy Jones' crew were actors. They all wore dark gray motion-capture suits, and before they could be filmed, they had to be scanned, in order for the computer to place the crew images over the top.",
    // reviews: "",
    // ratings: [Number],
  },
];

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    Movie.insertMany(movies).then((res) => {
      console.log("All movies are added to DB");
      return mongoose.disconnect();
    });
  });
