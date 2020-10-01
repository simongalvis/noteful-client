import React from 'react';
import './AddFolder.css';
import config from '../config';
import ApiContext from '../ApiContext';



class AddFolder extends React.Component{
    static contextType = ApiContext;

handleSubmit = e =>{
    e.preventDefault();
    const { folderTitle, id } = e.target
    const folder = {
        name: folderTitle.value,
        id: id.value
    }
    fetch(`${config.API_ENDPOINT}/folders`,{
        method: 'POST',
        body: JSON.stringify(folder),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res => res.json())
    
    //.then(data => {
     //name.value = ''
     //id.value = ''
     //this.context.addFolder(data)
     //this.props.history.push('/')} )
    //.then(resJson => console.log(resJson))
    .then(data => this.context.addFolder(data))
    .then(this.props.history.push('/'))

    .catch(err => console.log('We have an error: ' + err))

}

    render(){
        return(

            <section className='AddFolder'>
                <h2>Create a Folder</h2>
                    <form className='AddFolderForm' onSubmit={this.handleSubmit}>
                        <label htmlFor='folderTitle'>Folder Title</label>
                        <input type='text'
                               name='folderTitle' 
                               id='folderTitle' 
                               placeholder='Folder Name Here' 
                               onChange={e=> console.log(e.target.value)} 
                               required/>
                        <button type='submit'>Submit</button>
                          
                       
                    </form>
            </section>
        )
    }
}

export default AddFolder;