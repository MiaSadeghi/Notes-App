const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const titleExists = notes.find((note) => note.title === title);

  if (!titleExists) {
    notes.push({ title, body });
    saveNote(notes);
    console.log(chalk.inverse.green("note was added successfully."));
  } else {
    console.log(chalk.inverse.yellow("title already exists!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  if (filteredNotes.length === notes.length) {
    console.log(chalk.red.inverse("note does not exist."));
  } else {
    saveNote(filteredNotes);
    console.log(chalk.green.inverse("note was removed successfully."));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log(chalk.bold("no notes found."));
  } else {
    console.log(
      chalk.bold(`found ${notes.length} note${notes.length === 1 ? "" : "s"}`),
    );
    notes.forEach((note) => {
      console.log(note.title);
    });
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const targetNote = notes.find((note) => note.title === title);
  if (!targetNote) {
    console.log(chalk.red.inverse("Could not find note in notes.json."));
  } else {
    console.log(chalk.inverse.bold(targetNote.title));
    console.log(targetNote.body);
  }
};

// utility functions
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNote = (note) => {
  const noteJSON = JSON.stringify(note);
  fs.writeFileSync("notes.json", noteJSON);
};

module.exports = { addNote, removeNote, listNotes, readNote };
