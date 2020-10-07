import React from 'react';
import './AddFolder.css';
import config from '../config';
import ApiContext from '../ApiContext';
import FormError from '../FormError';
import PropTypes from 'prop-types';



class AddFolder extends React.Component{
    static contextType = ApiContext;


    

handleSubmit = e =>{
    e.preventDefault();
    const { folderTitle, id } = e.target; 
    
    
    if (!folderTitle.value.trim()){
        
       return alert("You must submit a value!");
     }
    
    
    const folder = {
        id: id.value,
        name: folderTitle.value,
        
    }


    fetch(`${config.API_ENDPOINT}/folders`,{
        method: 'POST',
        body: JSON.stringify(folder),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res => {
      if(!res.ok){
          return res.json().then(error => {
              throw error
          })
      }

        return res.json()})
    
    .then(data => this.context.addFolder(data))
    .then(this.props.history.push('/'))
    .catch(err => console.log('We have an error: ' + err))

    

}

handleCancel = (e) => this.props.history.push('/');

    render(){
        return(
        <FormError>
            <section className='AddFolder'>
                <h2>Create a Folder</h2>
                    <form className='AddFolderForm' onSubmit={this.handleSubmit} autoComplete='off'>
                        <label htmlFor='folderTitle'>Folder Title</label>
                        <input type='text'
                               name='folderTitle' 
                               id='folderTitle' 
                               placeholder='Folder Name Here' 
                               //onChange={e=> console.log(e.target.value)} 
                               //onClick={}
                               required/>
                        <button type='submit'>Submit</button>
                        
                          
                       
                    </form>
                    <button onClick={ e => this.handleCancel(e)}>Cancel</button>
                  

            </section>

            </FormError>
        )
    }
}

export default AddFolder;

AddFolder.propTypes = {
    history: PropTypes.object.isRequired,
}