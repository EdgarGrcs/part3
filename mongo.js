const mongoose = require("mongoose");

if (process.argv.length < 3){
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];
const phoneName = process.argv[3];
const phoneNumber = process.argv[4];


const url = `mongodb+srv://edgargrcs:${password}@phonebook.f1kdn36.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
    name:String,
    number:String,
})

const Phonebook = mongoose.model("Phonebook",phoneSchema);

const book = new Phonebook({
    name: phoneName,
    number: phoneNumber,
})


//if command line consists of password, name and number
if (password && phoneName && phoneNumber){
    book.save().then(result => {
        console.log(`added ${phoneName} number ${phoneNumber} to phonebook`);
        mongoose.connection.close();
    })
} 


//if command line consists of node mongo.js password, execute this:
if (password && !phoneName && !phoneNumber){
    //Listing all existing entries in MongoDB
    Phonebook.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(phonebook => {
            console.log(phonebook.name, phonebook.number);
        })
        mongoose.connection.close();
    })
}


