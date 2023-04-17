require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Phonebook = require("./models/phonebook");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));


const errorHandler = (error, request, response, next) => {
    console.error(error.message);
  
    if (error.name === "CastError"){
      return response.status(400).send({error:"Malformated id"})
    }
    next(error)
  }
  
  app.use(errorHandler);


//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// deprecated list of phonebook entries. No more needed due to switch to MongoDB
/*let phonebook = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
] */

app.get("/api/persons",(request,response) => {
    Phonebook.find({}).then(phone => {
        response.json(phone)
    })
})

app.get("/",(request,response) => {
    response.send("<h1>Wazzup</h1>");
})


app.get("/info",(requests,response) => {
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>`);
})

app.get("/api/persons/:id",(request,response, next) => {
    Phonebook.findById(request.params.id)
    .then(phoneEntry => {
        if (phoneEntry){
            response.json(phoneEntry);
        } else {
            response.status(404).end();
        }
    })
    .catch(error => next(error));
})

app.delete("/api/persons/:id",(request,response, next) => {
    Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


app.post("/api/persons",(request,response) => {
    const body = request.body;


   Phonebook.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
   })

    

    if (body.name === undefined){
        return response.status(400).json({error: "content missing"})
    }

    const phoneEntry = new Phonebook({
        name: body.name,
        number: body.number,
    })

    phoneEntry.save().then(savedPhone => {
        response.json(savedPhone);
    })
})
  
const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
} )