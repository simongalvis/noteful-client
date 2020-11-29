import React from 'react';
import './AddNote.css';
import config from'../config';
import ApiContext from '../ApiContext';
import FormError from '../FormError'
import PropTypes from 'prop-types';
//import { differenceInCalendarDays } from 'date-fns';



class AddNote extends React.Component{
static contextType = ApiContext;



handleSubmit = e =>{
    e.preventDefault();
    const {noteName,  noteContent} = e.target;
    
    console.log(noteContent.value)
    if(!noteName.value.trim()){
       return alert('You must submit a value!')
    }

    const note = {
        title: noteName.value,
        folder_id: this.context.selectedFolder,
        content:noteContent.value,

    } 
    
    fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=> {
      if(!res.ok){
          return res.json().then(error =>{
              throw error
          })
      }
       return res.json()})
    
    .then(data => this.context.addNote(data))
    .then(this.context.selectFolder(""))
    .then(this.props.history.push('/'))
    .catch(err => console.log('We have an error: ' + JSON.stringify(err)))
    //console.log('You submitted the form using React.')
}


    render(){
        
        return(
        <FormError>
            <section className='AddNote'>
                <h2>Create a Note</h2>
                    <form className='AddNoteForm' autoComplete='off' onSubmit={this.handleSubmit}>
                        <label htmlFor='noteName'>Note Title:  {'   '}</label>
                        <input type='text' name='noteName' id='noteName' placeholder='Note Name Here' required/>
                        <label htmlFor='noteContent'>Note Content: {' '}</label>
                        <textarea id='noteContent' name='noteContent' placeholder='Input note content here'></textarea>
                        <label htmlFor='folderChoice'>Note folder: {' '}</label>

                        <select name='folderChoice' onChange={e =>  this.context.selectFolder(e, this.context.folders.filter(folder => folder.name == e.target.value)[0].id)} /* onChange={e => this.context.selectFolder(e, e.target.value.id)} */ required>
                         <option/>
                         {this.context.folders.map(folder =>
                        <option name={folder.name}
                         key={folder.id}>{folder.name}</option>
                         )}
                        </select>
                        <button type='submit'>Submit</button>
                          
                       
                    </form>
            </section>

            </FormError>
        )
    }
}

export default AddNote;

AddNote.propTypes = {
    history: PropTypes.object.isRequired,
}