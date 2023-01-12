const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

yargs
  .scriptName("Notes")
  .command({
    command: "add",
    describe: "Add a new note",
    builder: {
      title: {
        describe: "Note Title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note Body",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      notes.addNote(argv.title, argv.body);
    },
  })
  .command({
    command: "remove",
    describe: "Remove a note",
    builder: {
      title: {
        describe: "Note Title",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      notes.removeNote(argv.title);
    },
  })
  .command({
    command: "list",
    describe: "List all notes",
    handler: () => {
      notes.listNotes();
    },
  })
  .command({
    command: "read",
    describe: "Read a note",
    builder: {
      title: {
        describe: "Note Title",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      notes.readNote(argv.title);
    },
  }).argv;
