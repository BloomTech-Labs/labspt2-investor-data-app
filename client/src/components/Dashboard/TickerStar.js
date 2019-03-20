import React from 'react'
import axios from 'axios'

class TickerStar extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            selected: false,
            star: 'far fa-star'
        }
    }

    selectHandler = (event) => {
        event.preventDefault(); 
        if(this.state.selected === false){
            this.setState({
                selected: true,
                star: 'fa fa-star'
            })   
            const newSymbol = {
                symbol: this.props.id,
                target: 1

            }


                   axios.post('http://www.localhost:5000/api/favorites', newSymbol)
                     .then( response => {
                         this.setState({
                             newSymbol: { symbol: '', targets: null, users_id: null}
                         })
                     })
                     .catch( err => { console.log( "we've encountered an error")})
            console.log(this.props.id)
         } else {
             this.setState({
                 selected: false,
                 star: 'far fa-star'
             })
         }
    }

    render(){
        return(
            <div>
                <i onClick={this.selectHandler} className={this.state.star}></i>
            </div> 
        )
    }
}

export default TickerStar