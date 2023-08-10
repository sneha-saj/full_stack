const express = require("express");
const moment = require("moment-timezone");
const app = express();
const PORT = 3001;
app.use(express.json()); 

function generateUniqueId() {
    const min = 1;
    const max = 1000000; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

let persons = [
  { id: 1, name: "Arto Hellas", phone: "040-123456" },
  { id: 2, name: "Ada Lovelace", phone: "99-44-5323523" },
  { id: 3, name: "Dan Abramov", phone: "12-43-234345" },
  { id: 4, name: "Mary Poppendick", phone: "39-23-6423122" },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const person = persons.find(person => person.id === id);
  
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
  
    res.json(person);
  });

app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const body = req.body;
    console.log('sd',req.body);
    if (!body.name || !body.phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }
  
    const newPerson = {
      id: generateUniqueId(),
      name: body.name,
      phone: body.phone,
    };
  
    persons.push(newPerson);
    res.status(201).json(newPerson);
  });

app.get("/info", (req, res) => {
  const currentTime = moment()
    .tz("Europe/Istanbul")
    .format("ddd MMM DD YYYY HH:mm:ss ZZ");
  const numPersons = persons.length;
  res.send(`
      <div>
        <p>Phonebook has info for ${numPersons} people</p>
        <p>${currentTime}</p>
      </div>
    `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
