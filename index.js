require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Phonebook = require("./models/phonebook");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
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

app.get("/api/persons/:id",(request,response) => {
    const id = Number(request.params.id);
    const book = phonebook.find(book => book.id === id);
    if (book){
        response.json(book);
    } else {
        response.status(404).end();
    }
})

app.delete("/api/persons/:id",(request,response) => {
    const id = Number(request.params.id);
    phonebook = phonebook.filter(book => book.id !== id);
    response.status(204).end();
})

const generateId = () => {
    const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(n => n.id))
    : 0
    return maxId + 1;
}

app.post("/api/persons",(request,response) => {
    const body = request.body;

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
  /*  if (!body.name){
        return response.status(400).json({
            error:"name is missing"
        })
    }
    const book = {
        id: generateId(),
        name: body.name,
        number:body.number,
    }

    if (!book.number){
        return response.status(400).json({
            error:"number is missing"
        })
    }

    if (phonebook.find(books => books.name === body.name)){
        return response.status(400).json({
            error:"name must be unique"
        })
    } */ 

   /// phonebook = phonebook.concat(book);
    //morgan.token("body",request => JSON.stringify(request.body));



const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
} )