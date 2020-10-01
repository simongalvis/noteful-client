import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  selectedFolder: '',
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  selectFolder: () => {},
  
})
