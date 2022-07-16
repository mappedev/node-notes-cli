const yargs = require('yargs')
// const chalk = require('chalk')
const notes = require('./notes')

// * Customize yargs version
yargs.version('1.1.0')

// add, read, list, remove
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler: () => notes.getNotes()
})
  
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => notes.getANote(argv.title)
})
  
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => notes.addNote(argv.title, argv.body)
})
  
  
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => notes.removeNote(argv.title)
})

// * Pass all arguments
yargs.parse()