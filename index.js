const express = require("express");
const moment = require("moment-timezone");
const app = express();
const PORT = 3001;

const persons = [
  { id: 1, name: "Arto Hellas", phone: "040-123456" },
  { id: 2, name: "Ada Lovelace", phone: "99-44-5323523" },
  { id: 3, name: "Dan Abramov", phone: "12-43-234345" },
  { id: 4, name: "Mary Poppendick", phone: "39-23-6423122" },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const currentTime = moment()
    .tz("Europe")
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
