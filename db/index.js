// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// Require Model

const Movie = require("../models/Movie.model");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/ironflix";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    // Created our own  Movies db:
    const movies = [
      {
        title: "Avengers: Endgame.",
        director: "Anthony Russo, Joe Russo",
        stars: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
        dateOfRelease: 2019,
        coverPic: "",
        description:
          "The universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        didYouKnow:
          "'Avengers: Endgame' is the first film to reach over a billion dollars during its opening weekend in theaters.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "The Godfather",
        director: "Francis Ford Coppola",
        stars: ["Marlon Brando", "Al Pacino", "James Caan"],
        dateOfRelease: 1972,
        coverPic: "",
        description:
          "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
        didYouKnow:
          "Marlon Brando wanted to make Don Corleone look like a bulldog, so he stuffed his cheeks with cotton wool for the audition. For the actual filming, he wore a mouthpiece made by a dentist. This appliance is on display in the American Museum of the Moving Image in Queens, New York.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "The Lord of the Rings: The Keepers of the Ring ",
        director: "Peter Jackson",
        stars: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
        dateOfRelease: 2001,
        coverPic: "",
        description:
          "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        didYouKnow:
          "Director Peter Jackson gave one of the rings used in the movies to Elijah Wood and Andy Serkis as a gift when the shoot was finished. They both thought they had the only one.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "Joker",
        director: "Todd Phillips",
        stars: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz "],
        dateOfRelease: 2019,
        coverPic: "",
        description:
          "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
        didYouKnow:
          "Joaquin Phoenix based his laugh on videos of people suffering from pathological laughter. He also sought to portray a character with which audiences could not identify.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "IT",
        director: "Andy Muschietti",
        stars: ["Jaeden Martell", "Bill Skarsgård", "Finn Wolfhard"],
        dateOfRelease: 2017,
        coverPic: "",
        description:
          "The story of seven children in Derry, Maine, who are terrorized by the eponymous being, only to face their own personal demons in the process.",
        didYouKnow:
          "The Child Actors Didn’t See Bill Skarsgård (Pennywise the clown) In Costume Until Filming Began",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "Corpse Bride ",
        director: "Tim Burton, Mike Johnson",
        stars: ["Johnny Depp", "Helena Bonham Carter", "Emily Watson"],
        dateOfRelease: 2005,
        coverPic: "",
        description:
          "When a shy groom practices his wedding vows in the inadvertent presence of a deceased young woman, she rises from the grave assuming he has married her.",
        didYouKnow: "This is the only Warner Bros.' stop-motion animated film.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "1917",
        director: "Sam Mendes",
        stars: ["Dean-Charles Chapman", "George MacKay", "Daniel Mays"],
        dateOfRelease: 2019,
        coverPic: "",
        description:
          "April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
        didYouKnow:
          "The lighting rig used for the burning church was five stories high and consisted of 2,000 1K tungsten lamps, a total of 2 megawatts. It was one of, if not the largest, lighting rigs ever built for a film.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "The Queen's Gambit",
        director: "Scott Frank , Allan Scott",
        stars: ["Anya Taylor-Joy", "Chloe Pirrie ", "Bill Camp"],
        dateOfRelease: 2020,
        coverPic: "",
        description:
          "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in the 1960s USA. But child stardom comes at a price.",
        didYouKnow:
          "According to The Chess Website, the Queen's Gambit is one of the most popular openings in chess because of its attacking prowess. Used when a player enjoys putting constant pressure on his or her opponent.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "Coco",
        director: " Lee Unkrich, Adrian Molina ",
        stars: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt"],
        dateOfRelease: 2017,
        coverPic: "",
        description:
          "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
        didYouKnow:
          "The look of the Land of the Dead is inspired by the Mexican city of Guanajuato, which has colorful houses placed on the hillsides in such a way that they look almost stacked.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "The Lion King",
        director: "Jon Favreau",
        stars: ["Donald Glover", "Beyoncé", "Seth Rogen"],
        dateOfRelease: 2019,
        coverPic: "",
        description:
          "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
        didYouKnow:
          "Favreau used virtual reality tech to walk around the virtual set and design shots, treating it like a real location.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "Star Wars: Episode V - The Empire Strikes Back",
        director: "Irvin Kershner",
        stars: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
        dateOfRelease: 1980,
        coverPic: "",
        description:
          "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
        didYouKnow:
          "The blasters used by the stormtroopers were constructed from Sterling L2A3 Mk 4 submachine guns.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "Cast Away",
        director: "Robert Zemeckis",
        stars: ["Tom Hanks", "Helen Hunt", "Paul Sanchez"],
        dateOfRelease: 2000,
        coverPic: "",
        description:
          "A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.",
        didYouKnow:
          "Actual lines of dialogue were written for Wilson the volleyball, to help Tom Hanks have a more natural interaction with the inanimate object.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "The Matrix",
        director: "The Wachowski Brothers",
        stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        dateOfRelease: 1999,
        coverPic: "",
        description:
          "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
        didYouKnow:
          "Neo is often referred to as the 'One', which is an anagram of 'Neo'",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "Gladiator",
        director: "Ridley Scott",
        stars: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen "],
        dateOfRelease: 2000,
        coverPic: "",
        description:
          "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        didYouKnow:
          "Maximus' description of his home--specifically, how the kitchen is arranged and smells in the morning and at night--was ad-libbed. It's a description of Russell Crowe's own home in Australia.",
        reviews: "",
        ratings: [Number],
      },

      {
        title: "Pirates of the Caribbean: Dead Man's Chest ",
        director: "Gore Verbinski",
        stars: ["Johnny Depp", "Orlando Bloom", "Keira Knightley"],
        dateOfRelease: 2006,
        coverPic: "",
        description:
          "Jack Sparrow races to recover the heart of Davy Jones to avoid enslaving his soul to Jones' service, as other friends and foes seek the heart for their own agenda as well.",
        didYouKnow:
          "All of Davy Jones' crew were actors. They all wore dark gray motion-capture suits, and before they could be filmed, they had to be scanned, in order for the computer to place the crew images over the top.",
        reviews: "",
        ratings: [Number],
      },
    ];

    Movie.insertMany(movies).then((res) => {
      console.log("All movies are added to DB");
    });
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
