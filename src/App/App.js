import React, {Component} from 'react';
import {Route, Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';

import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import FormError from '../FormError';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        selectedFolder:'',
        selectedNote:''
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddFolder = folder => {
       this.setState({
           folders: [...this.state.folders, folder]
       })
       //console.log('Folder has been added')
    }

    handleAddNote = note => {
        this.setState({
            notes: [...this.state.notes, note]
        })
        //console.log('note has been added')
     }
     handleSelectFolder = (event, id) =>{
         //console.log(event.target.value);
         /* let folderObj = this.state.folders.filter((folder) =>{
             return folder.name === event.target.value
         }) */
         //console.log(folderObj)
         this.setState({
             selectedFolder: id
         })
        // console.log('handleSelectFolderIsWorking')
     }
     handleSelectNote = (event, id) =>{
        //console.log(event.target.value);
        
        //console.log(folderObj)
        this.setState({
            selectedNote: id
        })
        //console.log('handleSelectNoteIsWorking')
    }



    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            selectedFolder: this.state.selectedFolder,
            selectedNote:this.state.selectedNote,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote:this.handleAddNote,
            selectFolder: this.handleSelectFolder,
            selectNote:this.handleSelectNote
            
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav"><FormError>{this.renderNavRoutes()}</FormError></nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/" onClick={e => this.context.selectFolder(e, "")}>Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main"><FormError>{this.renderMainRoutes()}</FormError></main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
