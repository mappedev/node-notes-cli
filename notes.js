const fs = require('fs')
const chalk = require('chalk')

const NOTES_PATH = 'notes.json'

// * Services
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(NOTES_PATH)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync(NOTES_PATH, dataJSON)
}

// * Controllers
const getNotes = () => {
  const notes = loadNotes()
  
  if (notes.length === 0) {
    console.log(chalk.yellow.inverse("You don't have any notes..."))
    return
  }

  console.table(notes)
}

const getANote = (title) => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)

  if (!note) {
    console.log(chalk.red.inverse('Note not found...'))
  }

  console.log('Title:', note.title)
  console.log('Body:', note.body)
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => note.title === title)

  if (duplicateNotes.length > 0) {
    console.log(chalk.red.inverse('Note title taken...'))
    return
  }

  notes.push({ title, body })
  saveNotes(notes)
  console.log(chalk.green.inverse('New note added!'))
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)

  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse('Note not found...'))
    return
  }

  saveNotes(notesToKeep)
  console.log(chalk.green.inverse('Note removed!')) 
}

module.exports = {
  getNotes,
  getANote,
  addNote,
  removeNote
}