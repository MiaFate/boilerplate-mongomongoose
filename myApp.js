require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let miaFate = new Person({ name: "Mia Fate", age: 39, favoriteFoods: ["Papitas", "Hamburguesa"] });
  miaFate.save(function(error, data) {
    console.log(data)
    if (error) return console.log(error)
    done(null, data);
  })
};

// const arrayOfPeople = [
//   { name: "Mia Fate", age: 39, favoriteFoods: ["Papitas", "Hamburguesa"] },
//   { name: "Miley Cyrus", age: 23, favoriteFoods: ["Caesar Salad", "Cheese Burguer"] },
//   { name: "Anthony Hopkins", age: 78, favoriteFoods: ["Sashimi", "Spaguettis"] },
// ]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(error, people) {
    if (error) return console.log(error)
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(error, personFound) {
    if (error) return console.log(error)
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(error, data) {
    if (error) return console.log(error)
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(error, data) {
    if (error) return console.log(error)
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function(error, person) {
    if (error) return console.log(error)
    person.favoriteFoods.push(foodToAdd);
    person.save((error, updatedPerson) => {
      if (error) return console.log(error)
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(error, updatedDoc) {
    if (error) return console.log(error)
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(error, removedDoc) {
    if (error) return console.log(error)
    done(null, removedDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
