import React from 'react'
import axios from 'axios'
import firebase from 'firebase'

class TickerStar extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            selected: false,
            star: 'far fa-star',
            stock: [],
            uid: firebase.auth().currentUser.uid,
        }
    }

    selectHandler = (event) => {
        event.preventDefault(); 
        if(this.state.selected === false){
            this.setState({
                selected: true,
                star: 'fa fa-star',
            })  
            const newSymbol = {
                symbol: this.props.id,
                uid: this.state.uid
            }
            axios.post('http://www.localhost:5000/api/favorites/', newSymbol)
                .then( response => {
                    this.setState({
                        newSymbol: { symbol: '', uid: ''}
                    })
                    window.location.reload()
                })
                .catch( err => { console.log( "we've encountered an error")})
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