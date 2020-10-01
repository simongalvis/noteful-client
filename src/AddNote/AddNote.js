import React from 'react';
import './AddNote.css';
import config from'../config';
import ApiContext from '../ApiContext';



class AddNote extends React.Component{
static contextType = ApiContext;

handleSubmit = e =>{
    e.preventDefault();
    const {noteName, id, noteContent} = e.target;
    const note = {
        name: noteName.value,
        id: id.value,
        folderId: this.context.selectedFolder,
        modified: new Date(),
        content:noteContent.value,

    } 
    
    fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=> res.json())
    .then(data => this.context.addNote(data))
    .then(this.props.history.push('/'))
    .then(resJson => console.log(resJson))
    console.log('You submitted the form using React.')
}

    render(){
        
        return(

            <section className='AddNote'>
                <h2>Create a Note</h2>
                    <form className='AddNoteForm' onSubmit={this.handleSubmit}>
                        <label htmlFor='noteName'>Note Title  {'   '}</label>
                        <input type='text' name='noteName' id='noteName' placeholder='Note Name Here' onChange={e=> console.log(e.target.value)} required/>
                        <label htmlFor='noteContent'>Note Content {' '}</label>
                        <textarea id='noteContent' name='noteContent' placeholder='Input note content here'></textarea>
                        <button type='submit'>Submit</button>
                          
                       
                    </form>
            </section>
        )
    }
}

export default AddNote;