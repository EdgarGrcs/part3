const express = require("express");
const app = express();

app.use(express.json());

let phonebook = 
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
]

app.get("/api/persons",(request,response) => {
    response.json(phonebook);
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



const PORT = 3001;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
} )