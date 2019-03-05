import React from 'react'
import Navigation from '../Navigation/index'
import Settings from '../Settings/index';

class Landing extends React.Component {
    constructor(){
        super();
    }
    
    render(){
        return(
            <div>
                <Navigation /> 
                <Settings />
            </div>
        )
    }
}


export default Landing