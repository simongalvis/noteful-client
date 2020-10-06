import React from 'react';



class FormError extends React.Component{
    state={
        hasError: false,
    }

    static getDerivedStateFromError(error){
        return {hasError: true};
    }
    render(){
        if (this.state.hasError){
            return <h2>Could not process form</h2>
        }
        return this.props.children;
    }
}



export default FormError;