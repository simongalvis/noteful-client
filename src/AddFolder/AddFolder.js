import React from 'react';
import './AddFolder.css';
import config from '../config';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';



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
    
  //  .then(resJson => {
      //  if(resJson.name.trim.length === 0){
        //    return resJson.then(error =>{
          //      throw console.log(error + 'you cannot enter nothing')
          //  })
           
       // }
       // return resJson
    //})
    .then(data => this.context.addFolder(data))
    .then(this.props.history.push('/'))
    .catch(err => console.log('We have an error: ' + err))

    

}

handleCancel = (e) => this.props.history.push('/');

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
                               //onClick={}
                               required/>
                        <button type='submit'>Submit</button>
                        
                          
                       
                    </form>
                    <button onClick={ e => this.handleCancel(e)}>Cancel</button>
                  

            </section>
        )
    }
}

export default AddFolder;

AddFolder.PropTypes = {
    
}