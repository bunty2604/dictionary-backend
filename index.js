
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// READ: Get all words
app.get("/api/words", (req, res) => {
  res.status(200).json(words);
});

// READ: Get one word by ID
app.get("/api/words/:id", (req, res) => {
  const id = Number(req.params.id);
  const word = words.find((item) => item.id === id);

  if (!word) {
    return res.status(404).json({ message: "Word not found" });
  }

  res.status(200).json(word);
});

// CREATE: Add a new word
app.post("/api/words", (req, res) => {
  const { word, meaning, example } = req.body;

  if (
    typeof word !== "string" ||
    !word.trim() ||
    typeof meaning !== "string" ||
    !meaning.trim()
  ) {
    return res.status(400).json({
      message: "Word and meaning are required",
    });
  }

  const newWord = {
    id: nextId++,
    word: word.trim(),
    meaning: meaning.trim(),
    example: typeof example === "string" ? example.trim() : "",
  };

  words.push(newWord);

  res.status(201).json({
    message: "Word added successfully",
    data: newWord,
  });
});

// UPDATE: Edit a word
app.put("/api/words/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = words.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Word not found" });
  }

  const { word, meaning, example } = req.body;

  if (
    typeof word !== "string" ||
    !word.trim() ||
    typeof meaning !== "string" ||
    !meaning.trim()
  ) {
    return res.status(400).json({
      message: "Word and meaning are required",
    });
  }

  words[index] = {
    id,
    word: word.trim(),
    meaning: meaning.trim(),
    example: typeof example === "string" ? example.trim() : "",
  };

  res.status(200).json({
    message: "Word updated successfully",
    data: words[index],
  });
});

// DELETE: Remove a word
app.delete("/api/words/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = words.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Word not found" });
  }

  const deletedWord = words[index];
  words.splice(index, 1);

  res.status(200).json({
    message: "Word deleted successfully",
    data: deletedWord,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
